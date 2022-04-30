import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, debounceTime, delay, exhaustMap, filter, first, mergeMap, Observable, startWith, Subscription, tap } from 'rxjs';
import { Contact, ListFilter } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { contactRecieved, contactsRequired } from 'src/app/state/cotacts/contacts.actions';
import { selectSources, selectUsers } from 'src/app/state/misc/misc.selectors';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.sass'],
})
export class ContactDataComponent implements OnChanges, OnDestroy {
  @Input() contact: Contact
  subscriptions: Subscription[] = []
  errorMessage: string
  users$ = this.store.select(selectUsers)
  sources$ = this.store.select(selectSources)
  form: FormGroup
  filtered: Contact[] = [];
  total: number;
  loading: boolean = false
  filter: ListFilter = { limit: 5, offset: 0, query: "" }
  @Output() anotherContact: EventEmitter<Contact> = new EventEmitter()
  // implement after guard to check if form changed
  // @HostListener('window:beforeunload')
  // canDeactivate(): Observable<boolean> | boolean {
  //   // insert logic to check if there are pending changes here;
  //   // returning true will navigate without confirmation
  //   // returning false will show a confirm dialog before navigating away
  // }
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private cs: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.contact) {
      this.form = this.fb.group({
        Name: [this.contact.Name, Validators.required],
        SecondName: [this.contact.SecondName],
        Phone: [this.contact.Phone],
        SecondPhone: [this.contact.SecondPhone],
        ResponsibleID: [this.contact.ResponsibleID, Validators.required],
        Email: [this.contact.Email, Validators.email],
        SecondEmail: [this.contact.SecondEmail, Validators.email],
        City: [this.contact.City],
        Address: [this.contact.Address],
        SourceID: [this.contact.SourceID],
        // we don't need it here
        // Position: [this.contact.Position],
        // URL: [this.contact.URL],
      })
      this.subscriptions.push(this.form.get("Phone").valueChanges.pipe(
        startWith(''),
        filter(val => val.length > 3),
        concatMap(val => {
          this.filter = { ...this.filter, query: val }
          this.loading = true
          return this.cs.List(this.filter)
        }),
        delay(1000),
        debounceTime(300),
      ).subscribe(res => {
        this.loading = false
        this.filtered = res.body || []
        this.total = Number(res.headers.get("X-Total-Count"))
      })
      )
    }
  }

  // "URL": "", "City": "Днепр", "Address": "", "SourceID":
  // "Position": "", "Analytics": { "CID": "", "UID": "", "TID": "", "UtmID": "", "UtmSource": "", "UtmMedium": "", "UtmCampaign": "", "Domain": "" } }

  save() {
    if (this.contact.ID) {
      const newContact: Contact = {
        ...this.contact,
        ...this.form.value,
        Phone: this.form.value.Phone.replace(/\D/g, ''),
        SecondPhone: this.form.value.SecondPhone.replace(/\D/g, '')
      }
      // console.log(newContact)
      this.cs.Save(newContact).pipe(first()).subscribe({
        next: (contact) => {
          this.store.dispatch(contactRecieved({ contact: newContact }))
          // console.log(contact)
        },
        error: () => this.errorMessage = `Can't save item "${newContact.Name}, with ID = ${newContact.ID}"`
      })
    }
    console.log("save and block temporary")

  }

  contactSelected(e: MatAutocompleteSelectedEvent) {
    console.log(this.form.value.Phone ,e)
    const phone = e.option.value    
    const contact = this.filtered.filter(c => c.Phone == phone)[0]
    // console.log(contact)
    if (this.route.snapshot.routeConfig.path.startsWith("contacts")) {
      // console.log("navigate to: ")
      this.router.navigate(["/contacts", contact.ID])
    } else {
      // console.log("change leads contact")
      this.anotherContact.emit(contact)
    }

  }

  get name() {
    return this.form.get("Name")
  }

  get resp() {
    return this.form.get("ResponsibleID")
  }

  get createdBy() {
    return `Created by ${this.contact.Created.Name || 'unknown'}`
  }

  get email() {
    return this.form.get("Email")
  }

  get secondEmail() {
    return this.form.get("SecondEmail")
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe())
  }

}