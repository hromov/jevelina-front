import { Component, EventEmitter, Input, OnDestroy, OnChanges, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute,  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concatMap, debounceTime, filter, first, startWith, Subscription } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { Contact, ListFilter, Source, User } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { contactRecieved } from 'src/app/state/cotacts/contacts.actions';
import { selectSources, selectUsers } from 'src/app/state/misc/misc.selectors';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.sass'],
})
export class ContactDataComponent implements OnInit, OnChanges, OnDestroy {
  @Input() contact: Contact
  subscriptions: Subscription[] = []
  errorMessage: string
  users: ReadonlyArray<User> = []
  sources: ReadonlyArray<Source> = []
  form: FormGroup
  filtered: Contact[] = [];
  total: number
  loading: boolean = false
  filter: ListFilter = { limit: 5, offset: 0, query: "" }
  saving: boolean
  showSource: boolean
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
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe(users => this.users = users  || [])
    this.store.select(selectSources).subscribe(sources => this.sources = sources || [])
  }

  ngOnChanges(): void {
    if (this.contact === null) {
      this.contact = this.getBlankContact()
      // console.log(this.contact)
    }
    this.form = this.fb.group({
      Name: [this.contact.Name, Validators.required],
      SecondName: [this.contact.SecondName],
      Phone: [this.contact.Phone],
      SecondPhone: [this.contact.SecondPhone],
      ResponsibleID: [this.contact.Responsible.ID, Validators.required],
      Email: [this.contact.Email, Validators.email],
      SecondEmail: [this.contact.SecondEmail, Validators.email],
      City: [this.contact.City],
      Address: [this.contact.Address],
    })
    if (!this.contact.Analytics || !this.contact.Analytics.Domain) {
      this.showSource = true
      this.form.addControl("SourceID", new FormControl(this.contact.Source ? this.contact.Source.ID : null))
    }
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

  save(force?: boolean) {
    if (force || this.contact.ID || (this.form.value.Phone.length >= 10)) {
      this.saving = true
      this.form.disable()
      const newContact: Contact = {
        ...this.contact,
        ...this.form.value,
        Phone: this.form.value.Phone.replace(/\D/g, ''),
        SecondPhone: this.form.value.SecondPhone.replace(/\D/g, '')
      }

      this.cs.Save(newContact).pipe(first()).subscribe({
        next: (contact) => {
          this.store.dispatch(contactRecieved({ contact: contact }))
          if (!this.contact.ID) {
            this.anotherContact.emit(contact)
          }
          this.form.markAsPristine()
        },
        error: () => this.errorMessage = `Can't save item "${newContact.Name}, with ID = ${newContact.ID}"`,
        complete: () => {this.saving = false, this.form.enable()}
      })
    }
    // console.log("save and block temporary")

  }

  delete() {
    if (confirm("Are you sure?")) {
      this.cs.Delete(this.contact.ID).subscribe({
        //TODO: produce an action to remove it from ng store
        next: () => window.history.back(),
        error: () => this.errorMessage = `Can't delete contact`,
      })
    }
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
