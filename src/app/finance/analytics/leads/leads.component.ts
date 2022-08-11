import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { DateSelectorService } from 'src/app/shared/date-selector/date-selector.service';
import { Lead, ListFilter } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { leadsPageChanged, leadsRequired } from 'src/app/state/leads/leads.actions';
import { selectCurrentPage, selectedUser, selectLeadsCurrentTotal } from 'src/app/state/leads/leads.selector';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.sass'],
})
export class LeadsComponent implements OnInit, OnChanges {
  @Input() minDate: Date;
  @Input() maxDate: Date;

  filter: ListFilter = { limit: 50, offset: 0, by_date: true }
  leads$: Observable<Lead[]> = this.store.select(selectCurrentPage)
  selectedUser$ = this.store.select(selectedUser)
  
  subs: Subscription[] = []
  total$: Observable<number> = this.store.select(selectLeadsCurrentTotal)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subs.push(this.selectedUser$.pipe(tap(userID => {
      this.filter = { ...this.filter, responsible: userID }
      this.pageChanged()
    })).subscribe())
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.minDate && this.maxDate) {
      this.filter = { ...this.filter, min_date: this.minDate, max_date: this.maxDate, completed: this.maxDate.getTime() < new Date().getTime() }
      this.pageChanged()
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  pageChanged(e?: PageEvent) {
    if (e) {
      this.filter = { ...this.filter, offset: e.pageIndex * this.filter.limit }
    } else {
      this.paginator && this.paginator.firstPage()
    }
    if (this.filter.min_date && this.filter.max_date) {
      this.store.dispatch(leadsPageChanged({ filter: this.filter }))
      this.store.dispatch(leadsRequired({ filter: this.filter }))
    }
  }

}
