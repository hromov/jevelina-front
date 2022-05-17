import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, first, Subscription } from 'rxjs';
import { DateSelectorService, MinMax } from 'src/app/shared/date-selector/date-selector.service';
import { CategorisedCashflow, CatSum } from '../analytics.model';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  providers: [AnalyticsService, DateSelectorService],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  cashFlow: CategorisedCashflow
  minDate: Date = new Date()
  maxDate: Date = new Date()
  subs: Subscription[] = []
  constructor(private analytics: AnalyticsService, private ds: DateSelectorService) { }

  ngOnInit(): void {
    this.minDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), 1)
    this.maxDate.setDate(this.maxDate.getDate() + 1)

    this.subs.push(this.ds.dateSelectors$.pipe(filter(val => !!val))
      .subscribe((minMax: MinMax) => {
        this.minDate = minMax.minDate
        this.maxDate = minMax.maxDate

        this.analytics.Categories({ min_date: this.minDate, max_date: this.maxDate })
          .pipe(first())
          .subscribe((cash: CategorisedCashflow) => this.cashFlow = cash)
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe())
  }

}
