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
  steps$ = this.store.select(selectCurrentSteps)
  selectedUser$ = this.store.select(selectedUser)
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

}
