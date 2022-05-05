import { Component, Input, OnInit } from '@angular/core';
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
  
  constructor(private ds: DateSelectorService) { }

  ngOnInit(): void {
    this.ds.init({minDate: this.minDate, maxDate: this.maxDate})
  }

  from(val: any) {
    this.ds.from(val)
  }

  to(val: any) {
    this.ds.to(val)
  }
}
