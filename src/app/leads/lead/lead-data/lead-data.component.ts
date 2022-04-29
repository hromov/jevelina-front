import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { Lead } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { leadRecieved } from 'src/app/state/leads/leads.actions';
import { selectManufacturers, selectProducts, selectSources, selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';
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
    private ls: LeadsService,
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lead)  {
      this.form = this.fb.group({
        Name: [this.lead.Name, Validators.required],
        StepID: [this.lead.StepID],
        ResponsibleID: [this.lead.ResponsibleID, Validators.required],
        SourceID: [this.lead.SourceID],        
        ProductID: [this.lead.ProductID],
        ManufacturerID: [this.lead.ManufacturerID],
      })
    }
  }

  save() {
    console.log("save and block temporary")
    const newLead = {
      ...this.lead,
      ...this.form.value
    }
    
    this.ls.Save(newLead).pipe(first()).subscribe({
      next: (contact) => {
        this.store.dispatch(leadRecieved({lead: newLead}))
        // console.log(contact)
      },
      error: () => this.errorMessage = `Can't save item "${newLead.Name}, with ID = ${newLead.ID}"`
    })
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
