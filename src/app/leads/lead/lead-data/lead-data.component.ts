import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { AuthService } from 'src/app/login/auth.service';
import { MiscService } from 'src/app/settings/misc/misc.service';
import { Contact, Lead, Step, Task } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { contactRecieved, contactRequired } from 'src/app/state/cotacts/contacts.actions';
import { selectContact } from 'src/app/state/cotacts/contacts.selectors';
import { leadRecieved } from 'src/app/state/leads/leads.actions';
import { selectManufacturers, selectProducts, selectSources, selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';
import { taskChanged } from 'src/app/state/tasks/tasks.actions';
import { selectFilteredTasks } from 'src/app/state/tasks/tasks.selectors';
import { LeadsService } from '../../leads.service';

@Component({
  selector: 'app-lead-data',
  templateUrl: './lead-data.component.html',
  styleUrls: ['./lead-data.component.sass']
})
export class LeadDataComponent implements OnChanges {
  @Input() lead: Lead
  errorMessage: string
  users$ = this.store.select(selectUsers)
  sources$ = this.store.select(selectSources)
  steps$ = this.store.select(selectSteps)
  products$ = this.store.select(selectProducts)
  manufacturers$ = this.store.select(selectManufacturers)
  contact$: Observable<Readonly<Contact>>
  form: FormGroup
  saving: boolean
  showSource: boolean

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private ls: LeadsService,
    public auth: AuthService,
    private api: ApiService,
    private cs: ContactsService,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lead) {
      this.form = this.fb.group({
        Name: [this.lead.Name, Validators.required],
        StepID: [this.lead.StepID],
        ResponsibleID: [this.lead.ResponsibleID, Validators.required],
        ProductID: [this.lead.ProductID],
        ManufacturerID: [this.lead.ManufacturerID],
      })
      if (!this.lead.Analytics || !this.lead.Analytics.Domain) {
        this.showSource = true
        this.form.addControl("SourceID", new FormControl(this.lead.SourceID))
      }
      if (this.lead.ContactID) {
        this.store.dispatch(contactRequired({ id: this.lead.ContactID }))
        this.contact$ = this.store.select(selectContact(this.lead.ContactID))
      } else {
        this.contact$ = null
      }
    }
  }

  save() {
    this.form.disable()
    this.saving = true
    const newLead: Lead = {
      ...this.lead,
      ...this.form.value,
    }

    this.ls.Save(newLead).pipe(first()).subscribe({
      next: (contact) => {
        this.store.dispatch(leadRecieved({ lead: newLead }))
      },
      error: () => this.errorMessage = `Can't save item "${newLead.Name}, with ID = ${newLead.ID}"`,
      complete: () => { this.saving = false, this.form.enable() }
    })
  }

  relinkContact(contact: Contact) {
    if (!this.lead.ContactID || confirm(`Are you sure want to change linked contact from ${this.lead.Contact.Name} to ${contact.Name}`)) {
      const newLead: Lead = {
        ...this.lead,
        ...this.form.value,
        ContactID: contact.ID,
        Contact: contact,
      }
      this.contact$ = this.store.select(selectContact(newLead.ContactID))
      this.ls.Save(newLead).pipe(first()).subscribe({
        next: () => {
          this.store.dispatch(leadRecieved({ lead: newLead }))
          // console.log(contact)
        },
        error: () => this.errorMessage = `Can't link new contact to lead "${newLead.Name}, with ID = ${newLead.ID}"`
      })
    } else {
      //don't know better way to reset contact back - it's already selected
      this.store.dispatch(contactRequired({ id: this.lead.ContactID }))
      // const currentUrl = this.router.url;
      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //   this.router.navigate([currentUrl]);
      // });
    }
  }


  responsibleChanged() {
    if (confirm("Change resposible in Tasks and Contacts?")) {
      const newResponsible = this.form.get('ResponsibleID').value
      this.changeTasksResponsible(newResponsible)
      this.changeContactsResponsible(newResponsible)
      this.save()
    } else {
      this.save()
    }
  }

  changeContactsResponsible(responsible: number) {
    this.store.select(selectContact(this.lead.ContactID))
        .pipe(first())
        .subscribe((contact: Contact) => {
          const newContact: Contact = {
            ...contact,
            ResponsibleID: responsible,
          }
          this.cs.Save(newContact).pipe(first()).subscribe({
            next: () => this.store.dispatch(contactRecieved({ contact: newContact })),
            error: (err) => alert(`Can't change contact's responsible error: ${err}`)
          })
        })
  }

  changeTasksResponsible(responsible: number) {
    this.store.select(selectFilteredTasks({ parent: this.lead.ID, active: true }))
        .pipe(first())
        .subscribe((tasks: Task[]) => {

          //TODO: make it fully server based? But we still need to change tasks in the store
          tasks.forEach((task => {
            const newTask: Task = {
              ...task,
              ResponsibleID: responsible
            }
            this.api.SaveTask(newTask).pipe(first()).subscribe({
              next: () => this.store.dispatch(taskChanged({ task: newTask })),
              error: (err) => alert(`Can't change task's responsible error: ${err}`)
            })
          }))
        })
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.ls.Delete(this.lead.ID).subscribe({
        //TODO: produce an action to remove it from ng store
        next: () => alert("Lead was deleted!"),
        error: () => this.errorMessage = `Can't delete lead`,
      })
    }
  }

  get name() {
    return this.form.get("Name")
  }

  get resp() {
    return this.form.get("ResponsibleID")
  }

  get step() {
    return this.form.get("StepID")
  }

  get createdBy() {
    return `Created by ${this.lead.Created.Name || 'unknown'}`
  }
}
