import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/login/auth.service';
import { AppState } from 'src/app/state/app.state';
import { taskChanged } from 'src/app/state/tasks/tasks.actions';
import { Task } from '../../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task: Task
  results : FormControl
  errorMessage: string
  constructor(private api: ApiService, private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.showForm) {
      this.results = new FormControl("", Validators.required)
    }
  }

  get showForm() {
    return this.task.DeadLine && !this.task.Completed
  }

  save() {
    const updatedTask: Task = {
      ...this.task,
      Results: this.results.value,
      Completed: true,
      Updated: this.auth.currentUser,
    }
    this.api.SaveTask(updatedTask).subscribe({
      next: () => this.store.dispatch(taskChanged({task: updatedTask})),
      error: () => this.errorMessage = "Wasn't able to update task"
    })
  }

  getClass(t: string): string {
    // console.log(new Date(t), new Date(), t > new Date())
    return (new Date(t) < new Date()) ? "outdated" : "date"
  }

}
