import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, debounceTime, delay, exhaustMap, filter, first, mergeMap, Observable, startWith, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
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
  total: number
  loading: boolean = false
  filter: ListFilter = { limit: 5, offset: 0, query: "" }
  saving: boolean
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
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // if it's null - we are creating new lead now
    if (this.contact === null) {
      this.contact = this.getBlankContact()
      // console.log(this.contact)
    }
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
        debounceTime(50),
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

  save(force?: boolean) {
    if (force || this.contact.ID) {
      this.saving = true
      this.form.disable()
      const newContact: Contact = {
        ...this.contact,
        ...this.form.value,
        Phone: this.form.value.Phone.replace(/\D/g, ''),
        SecondPhone: this.form.value.SecondPhone.replace(/\D/g, '')
      }
      // console.log(newContact)
      this.cs.Save(newContact).pipe(first()).subscribe({
        next: (contact) => {
          this.store.dispatch(contactRecieved({ contact: this.contact.ID ? newContact : contact }))
          if (!this.contact.ID) {
            this.anotherContact.emit(contact)
          }
        },
        error: () => this.errorMessage = `Can't save item "${newContact.Name}, with ID = ${newContact.ID}"`,
        complete: () => {this.saving = false, this.form.enable()}
      })
    }
    // console.log("save and block temporary")

  }

  contactSelected(e: MatAutocompleteSelectedEvent) {
    // console.log(this.form.value.Phone ,e)
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
    return `Created by ${this.contact.Created?.Name || 'unknown'}`
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

  getBlankContact(): Contact {
    return {
      ID: null,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      IsPerson: true,
      Name: "",
      SecondName: "",
      // TODO: put real after AUTH
      ResponsibleID: this.auth.currentUser ? this.auth.currentUser.ID : 0,
      Responsible: this.auth.currentUser,
      // we don't need it - it will be set on server
      Created: null,
      Tags: [],
      Phone: "",
      SecondPhone: "",
      Email: "",
      SecondEmail: "",
      URL: "",
      City: "",
      Address: "",
      //probably put some default
      SourceID: null,
      Source: null,
      Position: "",
      Analytics: null,
    }
  }

}
