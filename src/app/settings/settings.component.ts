import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Role, Step, User } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { selectRoles, selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  users$: Observable<ReadonlyArray<User>> = this.store.select(selectUsers)
  roles$: Observable<ReadonlyArray<Role>> = this.store.select(selectRoles)
  steps$: Observable<ReadonlyArray<Step>> = this.store.select(selectSteps)
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

}
