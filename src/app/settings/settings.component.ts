import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Role, Step, User } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { selectRoles, selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  selectedTab: number
  users$: Observable<ReadonlyArray<User>> = this.store.select(selectUsers)
  roles$: Observable<ReadonlyArray<Role>> = this.store.select(selectRoles)
  steps$: Observable<ReadonlyArray<Step>> = this.store.select(selectSteps)
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.selectedTab = params["tab"] || 0)
  }

  tabChanged(e: MatTabChangeEvent) {
    const queryParams: Params = { tab: e.index };
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: '', // remove to replace all query params by provided
      });
  }

}
