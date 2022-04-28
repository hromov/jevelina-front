import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { MiscService } from '../settings/misc/misc.service';
import { ListFilter } from '../shared/model';
import { AppState } from '../state/app.state';
import { selectSteps } from '../state/misc/misc.selectors';
import { LeadsService } from './leads.service';

let active = true

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.sass']
})
export class LeadsComponent implements OnInit {
  // if only active
  steps$ = this.store.select(selectSteps).pipe(map(steps => active ? steps.filter(s => s.Active) : steps));
  // total$ = this.store.select(selectTotalLeads);
  constructor(
    private leadsService: LeadsService,
    private store: Store<AppState>,
    private miscService: MiscService,
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
