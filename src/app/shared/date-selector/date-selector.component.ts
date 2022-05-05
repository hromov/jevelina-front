import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateSelectorService } from './date-selector.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.sass']
})
export class DateSelectorComponent implements OnInit {
  @Input() minDate: Date
  @Input() maxDate: Date
  fromControl: FormControl
  toControl: FormControl
  constructor(private ds: DateSelectorService) { }

  ngOnInit(): void {
    this.fromControl = new FormControl(this.minDate)
    this.toControl = new FormControl(this.maxDate)
    this.fromControl.valueChanges.subscribe(val => this.ds.from(val))
    this.toControl.valueChanges.subscribe(val => this.ds.from(val))
    this.ds.init({minDate: this.minDate, maxDate: this.maxDate})
  }
}
