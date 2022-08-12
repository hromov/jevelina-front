import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Subscription, tap } from 'rxjs';
import { ListFilter } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { selectedUser } from 'src/app/state/leads/leads.selector';
import { SourceCount } from '../analytics.model';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.sass'],
  providers: [AnalyticsService]
})
export class SourcesComponent implements OnInit, OnChanges {
  @Input() minDate: Date
  @Input() maxDate: Date
  columns: string[] = ["source", "count"]
  sources: SourceCount[] = []
  filter: ListFilter = { }
  subs: Subscription[] = []
  selectedUser$ = this.store.select(selectedUser)
  constructor(private als: AnalyticsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.push(this.selectedUser$.pipe(tap(userID => {
      this.filter = { ...this.filter, responsible: userID }
      this.refresh()
    })).subscribe())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.minDate && this.maxDate) {
      this.filter = { ...this.filter, min_date: this.minDate, max_date: this.maxDate}
      this.refresh()
    }
  }


  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  refresh() {
    if (this.filter.min_date && this.filter.max_date) {
      this.als.Sources(this.filter).pipe(first()).subscribe(sources => {
        sources.sort((a, b) => b.Count - a.Count)
        const total:SourceCount = {
          Source: "Total",
          Count: sources.reduce((sum, cur) => sum + cur.Count, 0)
        }
        sources.push(total)
        this.sources = sources
      })
    }
  }

}
