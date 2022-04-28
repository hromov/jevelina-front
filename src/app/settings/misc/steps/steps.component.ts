import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Step } from 'src/app/shared/model';
import { stepChanged } from 'src/app/state/misc/misc.actions';
import { MiscService } from '../misc.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.sass']
})
export class StepsComponent implements OnInit {
  @Input() steps: ReadonlyArray<Step> = []
  constructor(private misc: MiscService, private store: Store) { }

  ngOnInit(): void {
  }

  newStep() {
    this.misc.SaveStep({Name: `Step ${new Date().getSeconds()}`}).subscribe({
      next: step => {
        this.store.dispatch(stepChanged({ step: step }))
      },
      error: () => confirm("Can't create new step. Try again")
    })
  }

}
