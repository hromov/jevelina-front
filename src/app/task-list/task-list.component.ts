import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  form: FormGroup
  future: MinMax
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.today = {minDate: new Date(), maxDate: null}
    this.outdated = {minDate: null, maxDate: this.today.minDate}
    this.tomorrow = {minDate: new Date(), maxDate: new Date()}
    this.tomorrow.minDate.setDate(this.today.minDate.getDate()+1)
    this.tomorrow.maxDate.setDate(this.today.minDate.getDate()+2)
    this.today.maxDate = this.tomorrow.minDate
    this.future = {
      minDate: new Date(),
      maxDate: new Date()
    }
    this.future.maxDate.setDate(this.future.maxDate.getDate()+28)
    this.form = this.fb.group({
      From: this.future.minDate,
      To: this.future.maxDate,
    })
    this.form.valueChanges.subscribe(val => {
      this.future.minDate = val.From
      this.future.maxDate = val.To
    })
  }

}
