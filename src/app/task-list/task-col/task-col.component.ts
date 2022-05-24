import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, filter, Subscription, tap } from 'rxjs';
import { ListFilter, Task, User } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { leadsRequired, selectedUserChanged } from 'src/app/state/leads/leads.actions';
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
        const _filter: ListFilter = { min_date: this.minDate, max_date: this.maxDate, responsible: selectedUser }
        this.store.dispatch(tasksRequired({ filter: _filter }))
        return this.store.select(selectFilteredTasks(_filter))
          .pipe(
            filter(tasks => tasks.length > 0),
            tap((tasks: Task[]) => this.store.dispatch(leadsRequired({filter: {ids: tasks.map((t) => t.ParentID)}})))
          )
      })
    ).subscribe(tasks => this.tasks = tasks)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
