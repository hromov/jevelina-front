import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Task } from 'src/app/shared/model';

@Component({
  selector: 'app-task-col',
  templateUrl: './task-col.component.html',
  styleUrls: ['./task-col.component.sass']
})
export class TaskColComponent implements OnInit {
  @Input() minDate: Date
  @Input() maxDate: Date
  //should be from selecet, probably
  tasks$: Observable<Task[]>
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.tasks$ = this.api.Tasks({min_date: this.minDate, max_date: this.maxDate, limit: 0})
  }

}
