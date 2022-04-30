import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectedUser } from '../state/leads/leads.selector';
import { selectCurrentSteps } from '../state/misc/misc.selectors';

let active = true

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.sass']
})
export class LeadsComponent implements OnInit {
  // if only active
  steps$ = this.store.select(selectCurrentSteps)
  selectedUser$ = this.store.select(selectedUser)
  // total$ = this.store.select(selectTotalLeads);
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    
    // const filter: ListFilter = {limit: 50, offset: 0, active: true}
    // //move to store
    // this.leadsService
    //   .List(filter)
    //   .subscribe((resp) => {
    //     const total = Number(resp.headers.get("X-Total-Count"))
    //     this.store.dispatch(retrievedLeadsList({ leads: resp.body || [], total: total, current: filter }))
    //   });
  }

}
