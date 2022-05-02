import { Component, OnInit } from '@angular/core';

interface MinMax {
  minDate: Date
  maxDate: Date
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  outdated: MinMax
  today: MinMax
  tomorrow: MinMax
  constructor() { }

  ngOnInit(): void {
    this.today = {minDate: new Date(), maxDate: null}
    this.outdated = {minDate: null, maxDate: this.today.minDate}
    this.tomorrow = {minDate: new Date(), maxDate: new Date()}
    this.tomorrow.minDate.setDate(this.today.minDate.getDate()+1)
    this.tomorrow.maxDate.setDate(this.today.minDate.getDate()+2)
    this.today.maxDate = this.tomorrow.minDate
  }

}
