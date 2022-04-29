import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Task } from '../../model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  @Input() task: Task
  @Output() taskUpdated = new EventEmitter<Task>();
  results : FormControl
  errorMessage: string
  constructor(private api: ApiService) { }

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
    }
    this.api.SaveTask(updatedTask).subscribe({
      next: () => this.taskUpdated.emit(updatedTask),
      error: () => this.errorMessage = "Wasn't able to update task"
    })
  }

}
