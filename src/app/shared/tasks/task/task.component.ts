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
  @Input() clickable: boolean
  results : FormControl
  description : FormControl
  errorMessage: string
  rows = 5
  editable = false
  constructor(private api: ApiService, private store: Store<AppState>, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.showForm) {
      this.results = new FormControl("", Validators.required)
    }
    if (this.task.Description) {
      const newLines = this.task.Description.match(/\n/gm) || []
      this.rows = newLines.length + 1
      this.description = new FormControl(this.task.Description)
    }
    
  }

  get showForm() {
    return !this.clickable && this.task.DeadLine && !this.task.Completed
  }

  save() {
    const updatedTask: Task = {
      ...this.task,
      Results: this.results ? this.results.value : "",
      Completed: true,
      Updated: this.auth.currentUser,
      Description: this.description.value,
    }
    this.api.SaveTask(updatedTask).subscribe({
      next: () => this.store.dispatch(taskChanged({task: updatedTask})),
      error: () => this.errorMessage = "Wasn't able to update task"
    })
  }

  edit() {
    this.editable = !this.editable
  }

  getClass(t: string): string {
    return (new Date(t) < new Date()) ? "outdated" : "date"
  }

  get editIcon(): string {
    return this.editable ? 'close' : 'edit'
  }

  get parentRoute(): string {
    //TODO: who knows what
    return this.task.ParentID.toString().startsWith("2") ? "/leads" : "/contacts"
  }

}
