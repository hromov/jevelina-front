import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MiscService } from '../misc/misc.service';
import { ListFilter, Step } from '../models/model';
import { AppState } from '../state/app.state';
import { retrievedLeadList } from '../state/leads/leads.actions';
import { selectCurrent, selectLeadsByStep, selectTotal } from '../state/leads/leads.selector';
import { LeadsService } from './leads.service';



@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.sass']
})
export class LeadsComponent implements OnInit {
  steps: Step[] = []

  total$ = this.store.select(selectTotal);
  constructor(
    private leadsService: LeadsService,
    private store: Store<AppState>,
    private miscService: MiscService,
  ) { }

  ngOnInit(): void {
    const filter: ListFilter = {limit: 50, offset: 0, active: true}
    //move to store
    this.miscService.Steps().subscribe(steps => this.steps = steps ? steps.filter(step => step.Active) : [])
    this.leadsService
      .List(filter)
      .subscribe((resp) => {
        const total = Number(resp.headers.get("X-Total-Count"))
        this.store.dispatch(retrievedLeadList({ leads: resp.body || [], total: total, current: filter }))
      });
  }

}
