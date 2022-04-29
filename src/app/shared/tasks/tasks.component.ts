import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AppState } from 'src/app/state/app.state';
import { selectUsers } from 'src/app/state/misc/misc.selectors';
import { taskChanged, tasksRequired } from 'src/app/state/tasks/tasks.actions';
import { selectTasksFor } from 'src/app/state/tasks/tasks.selectors';
import { Task } from '../model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  @Input() parentID: number
  tasks$: Observable<ReadonlyArray<Task>>
  form: FormGroup
  users$ = this.store.select(selectUsers)
  constructor(private api: ApiService, private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasksFor(this.parentID))
    this.store.dispatch(tasksRequired({parentID: this.parentID}))
    // this.api.TasksFor(this.parentID).subscribe(tasks => this.tasks = tasks)
    this.form = this.fb.group({
      Description: ["", Validators.required],
      Deadline: [],
      //shoud be set by default to current user
      ResponsibleID: [, Validators.required]
      // Files: [""]      
    })
  }

  save() {
    const newTask = {
      ...this.form.value,
      ParentID: this.parentID,
    }
    
    this.api.SaveTask(newTask).subscribe(task => {
      this.store.dispatch(taskChanged({task}))
      this.form.reset()
    })
  }

  get desc() {
    return this.form.get("Description")
  }

  get resp() {
    return this.form.get("ResponsibleID")
  }
}
