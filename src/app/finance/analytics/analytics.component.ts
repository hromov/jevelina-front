import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { DateSelectorService } from 'src/app/shared/date-selector/date-selector.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass'],
  providers: [DateSelectorService]
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  minDate: Date = new Date()
  maxDate: Date = new Date()
  subs: Subscription[] = []
  constructor(private ds: DateSelectorService) { }

  ngOnInit(): void {
    this.minDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1)
    this.maxDate.setDate(this.maxDate.getDate() + 1)
    this.subs.push(this.ds.dateSelectors$.pipe(filter(val => !!val)).subscribe(minMax => {
      this.minDate = minMax.minDate
      this.maxDate = minMax.maxDate
    }))
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

}
