import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MiscService } from 'src/app/settings/misc/misc.service';
import { Step } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { stepChanged, stepDeleted } from 'src/app/state/misc/misc.actions';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.sass']
})
export class StepComponent implements OnChanges {
  @Input() step: Readonly<Step>
  form: FormGroup
  errorMessage = ""
  constructor(private fb: FormBuilder, private misc: MiscService, private store: Store<AppState>) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form && this.step) {
      this.form = this.fb.group({
        Name: [this.step.Name, Validators.required],
        Order: [this.step.Order, [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]],
        Active: [this.step.Active],
      })
    }
  }

  save() {
    const newStep = {
      ...this.step,
      ...this.form.value
    }
    this.misc.SaveStep(newStep).subscribe({
      next: () => {
        this.store.dispatch(stepChanged({ step: newStep }))
      },
      error: () => this.errorMessage = `Can't save step: ${this.step.Name}`
    })
  }

  delete() {
    // But nothing will be reconfugured in base for leads that had this step
    if (confirm(`Are you sure you want to delete "${this.step.Name}"?`)) {
      this.misc.DeleteStep(this.step.ID).subscribe({
        next: () => {
          this.store.dispatch(stepDeleted({ stepID: this.step.ID }))
        },
        error: () => this.errorMessage = `Can't delete step: ${this.step.Name}`
      })
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }

}
