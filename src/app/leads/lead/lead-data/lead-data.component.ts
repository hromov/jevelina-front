import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { AuthService } from 'src/app/login/auth.service';
import { Contact, Lead, LeadData, Manufacturer, Product, Source, Step, Task, User } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { contactRecieved, contactRequired } from 'src/app/state/cotacts/contacts.actions';
import { selectContact } from 'src/app/state/cotacts/contacts.selectors';
import { leadRecieved } from 'src/app/state/leads/leads.actions';
import { selectManufacturers, selectProducts, selectSaleStep, selectSources, selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';
import { taskChanged } from 'src/app/state/tasks/tasks.actions';
import { selectFilteredTasks } from 'src/app/state/tasks/tasks.selectors';
import { LeadsService } from '../../leads.service';

@Component({
  selector: 'app-lead-data',
  templateUrl: './lead-data.component.html',
  styleUrls: ['./lead-data.component.sass']
})
export class LeadDataComponent implements OnInit, OnChanges {
  @Input() lead: Lead
  users: ReadonlyArray<User> = []
  sources: ReadonlyArray<Source> = []
  steps: ReadonlyArray<Step> = []
  products: ReadonlyArray<Product> = []
  manufacturers: ReadonlyArray<Manufacturer> = []
  contact$: Observable<Readonly<Contact>>
  errorMessage: string
  completeStepID: number
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

  ngOnInit(): void {
    this.store.select(selectUsers).subscribe(users => this.users = users || [])
    this.store.select(selectSources).subscribe(sources => this.sources = sources || [])
    this.store.select(selectSteps).subscribe(steps => this.steps = steps || [])
    this.store.select(selectProducts).subscribe(products => this.products = products || [])
    this.store.select(selectManufacturers).subscribe(manufs => this.manufacturers = manufs || [])
    this.store.select(selectSaleStep).subscribe(step => this.completeStepID = step ? step.ID : null)

  }

  ngOnChanges(): void {
    if (this.lead) {
      this.form = this.fb.group({
        Name: [this.lead.Name, Validators.required],
        StepID: [this.lead.Step.ID],
        ResponsibleID: [this.lead.Responsible.ID, [Validators.required, Validators.min(1)]],
        ProductID: [this.lead.Product.ID, [Validators.required, Validators.min(1)]],
        ManufacturerID: [this.lead.Manufacturer.ID, [Validators.required, Validators.min(1)]],
      })
      if (!this.lead.Analytics || !this.lead.Analytics.Domain) {
        this.showSource = true
        this.form.addControl("SourceID", new FormControl(this.lead.Source.ID, [Validators.required, Validators.min(1)]))
      }
      if (this.lead.Contact.ID) {
        this.store.dispatch(contactRequired({ id: this.lead.Contact.ID }))
        this.contact$ = this.store.select(selectContact(this.lead.Contact.ID))
      } else {
        this.contact$ = null
      }
    }
  }

  save() {
    this.form.disable()
    this.saving = true
    const newLead: LeadData = {
      ...this.lead,
      ...this.form.value,
    }
    this.ls.Save(newLead).pipe(first()).subscribe({
      next: (updated: Lead) => {
        this.store.dispatch(leadRecieved({ lead: updated }))
        this.form.markAsPristine()
      },
      error: () => this.errorMessage = `Can't save item "${newLead.Name}, with ID = ${newLead.ID}"`,
      complete: () => { this.saving = false, this.form.enable() }
    })
  }

  relinkContact(contact: Contact) {
    if (!this.lead.Contact.ID || confirm(`Are you sure want to change linked contact from ${this.lead.Contact.Name} to ${contact.Name}`)) {
      const newLead: LeadData = {
        ...this.lead,
        ...this.form.value,
        ContactID: contact.ID,
      }
      this.contact$ = this.store.select(selectContact(newLead.ContactID))
      this.ls.Save(newLead).pipe(first()).subscribe({
        next: (updated) => this.store.dispatch(leadRecieved({ lead: updated })),
        error: () => this.errorMessage = `Can't link new contact to lead "${newLead.Name}, with ID = ${newLead.ID}"`
      })
    } else {
      //don't know better way to reset contact back - it's already selected
      this.store.dispatch(contactRequired({ id: this.lead.Contact.ID }))
    }
  }

  stepChanged(e: any) {
    if (this.isBlankSource() || (this.form.invalid && e.value === this.completeStepID)) {
      this.form.markAllAsTouched()
      this.form.get('StepID').patchValue(this.lead.Step.ID)
    } else {
      this.save()
    }
  }

  isBlankSource(): boolean {
    return this.showSource && !this.lead.Source.ID
  }

  responsibleChanged() {
    this.save()
    if (confirm("Change resposible in Tasks and Contacts?")) {
      const newResponsible = this.form.get('ResponsibleID').value
      this.changeTasksResponsible(newResponsible)
      this.changeContactsResponsible(newResponsible)
    }
  }

  changeContactsResponsible(responsible: number) {
    this.store.select(selectContact(this.lead.Contact.ID))
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

  get source() {
    return this.form.get("SourceID")
  }

  get createdBy() {
    return `Created by ${this.lead.Created.Name || 'unknown'}`
  }
}
