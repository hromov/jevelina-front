import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { Contact } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { contactRecieved } from 'src/app/state/cotacts/contacts.actions';
import { selectSources, selectUsers } from 'src/app/state/misc/misc.selectors';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDataComponent implements OnChanges {
  @Input() contact: Contact
  errorMessage: string
  users$ = this.store.select(selectUsers)
  sources$ = this.store.select(selectSources)
  form: FormGroup

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
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.contact)  {
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
        URL: [this.contact.URL],
        
      })
    }
  }

  // "URL": "", "City": "Днепр", "Address": "", "SourceID":
  // "Position": "", "Analytics": { "CID": "", "UID": "", "TID": "", "UtmID": "", "UtmSource": "", "UtmMedium": "", "UtmCampaign": "", "Domain": "" } }

  save() {
    console.log("save and block temporary")
    const newContact = {
      ...this.contact,
      ...this.form.value
    }
    // console.log(newContact)
    this.cs.Save(newContact).pipe(first()).subscribe({
      next: (contact) => {
        this.store.dispatch(contactRecieved({contact: newContact}))
        // console.log(contact)
      },
      error: () => this.errorMessage = `Can't save item "${newContact.Name}, with ID = ${newContact.ID}"`
    })
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

}
