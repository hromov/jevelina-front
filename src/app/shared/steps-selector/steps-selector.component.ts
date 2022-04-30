import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, first, tap } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectedStepsChanged } from 'src/app/state/misc/misc.actions';
import { selectCurrentSteps, selectedSteps, selectSteps } from 'src/app/state/misc/misc.selectors';

@Component({
  selector: 'steps-selector',
  templateUrl: './steps-selector.component.html',
  styleUrls: ['./steps-selector.component.sass']
})
export class StepsSelectorComponent implements OnInit {
  steps$ = this.store.select(selectSteps)
  stepsControl: FormControl = new FormControl()
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectedSteps).pipe(filter((val:any) => val.length), first()).subscribe(selected => this.stepsControl.patchValue(selected))
    this.stepsControl.valueChanges
      .subscribe(selected => this.store.dispatch(selectedStepsChanged({ selected })))
  }

}
