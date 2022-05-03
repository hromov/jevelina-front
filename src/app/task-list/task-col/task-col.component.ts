import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { mergeMap, Observable, Subscription } from 'rxjs';
import { ListFilter, Task, User } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { selectedUserChanged } from 'src/app/state/leads/leads.actions';
import { selectedUser } from 'src/app/state/leads/leads.selector';
import { tasksRequired } from 'src/app/state/tasks/tasks.actions';
import { selectFilteredTasks } from 'src/app/state/tasks/tasks.selectors';

@Component({
  selector: 'app-task-col',
  templateUrl: './task-col.component.html',
  styleUrls: ['./task-col.component.sass']
})
export class TaskColComponent implements OnChanges, OnDestroy {
  @Input() minDate: Date
  @Input() maxDate: Date
  //should be from selecet, probably
  tasks: Task[]
  selectedUser: number
  sub: Subscription
  constructor(private store: Store<AppState>) { }

  ngOnChanges(): void {
    if (this.sub) {
      this.sub.unsubscribe()
    }
    this.sub = this.store.select(selectedUser).pipe(
      mergeMap(selectedUser => {
        const filter: ListFilter = { min_date: this.minDate, max_date: this.maxDate, responsible: selectedUser }
        this.store.dispatch(tasksRequired({ filter }))
        return this.store.select(selectFilteredTasks(filter))
      })
    ).subscribe(tasks => this.tasks = tasks)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
