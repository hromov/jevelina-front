import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScrollService } from '../shared/scroll.service';
import { AppState } from '../state/app.state';
import { selectedUser } from '../state/leads/leads.selector';
import { selectCurrentSteps } from '../state/misc/misc.selectors';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.sass'],
  providers: [ScrollService]
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
