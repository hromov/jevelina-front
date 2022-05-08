import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, first, map } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { AppState } from 'src/app/state/app.state';
import { selectedUserChanged } from 'src/app/state/leads/leads.actions';
import { selectedStepsChanged } from 'src/app/state/misc/misc.actions';
import { selectedSteps, selectSteps, selectUsers } from 'src/app/state/misc/misc.selectors';

const hiddenUserEmail = "random@random.org"

@Component({
  selector: 'steps-selector',
  templateUrl: './steps-selector.component.html',
  styleUrls: ['./steps-selector.component.sass']
})
export class StepsSelectorComponent implements OnInit {
  steps$ = this.store.select(selectSteps)
  users$ = this.store.select(selectUsers).pipe(map(users => users.filter(u => u.Email != hiddenUserEmail)))
  stepsControl: FormControl = new FormControl()
  usersControl: FormControl = new FormControl()
  constructor(private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit(): void {
    this.store.select(selectedSteps).pipe(filter((val:any) => val.length), first()).subscribe(selected => this.stepsControl.patchValue(selected))
    this.stepsControl.valueChanges
      .subscribe(selected => this.store.dispatch(selectedStepsChanged({ selected })))
    this.usersControl.valueChanges
      .subscribe(selected => this.store.dispatch(selectedUserChanged({userID: selected[0]})))
    this.auth.user$.pipe(filter(user => !!user)).subscribe(user => this.store.dispatch(selectedUserChanged({userID: user.ID})))
  }

}
