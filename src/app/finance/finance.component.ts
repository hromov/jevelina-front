import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { DateSelectorService } from '../shared/date-selector/date-selector.service';
import { Lead, ListFilter } from '../shared/model';
import { AppState } from '../state/app.state';
import { walletsRequired } from '../state/finance/finance.actions';
import { leadsPageChanged, leadsRequired } from '../state/leads/leads.actions';
import { selectCurrentPage, selectedUser, selectLeadsCurrentTotal } from '../state/leads/leads.selector';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.sass'],
  providers: [DateSelectorService]
})
export class FinanceComponent implements OnInit, OnDestroy {
  filter: ListFilter = {limit: 50, offset: 0}
  leads$: Observable<Lead[]> = this.store.select(selectCurrentPage)
  total$: Observable<number>  = this.store.select(selectLeadsCurrentTotal)
  selectedUser$ = this.store.select(selectedUser)
  minDate = new Date()
  maxDate = new Date()
  subs: Subscription[] = []
  constructor(private store: Store<AppState>, private ds: DateSelectorService) { }

  ngOnInit(): void {
    this.store.dispatch(walletsRequired())
    this.minDate.setDate(this.minDate.getDate() - 28)
    this.maxDate.setDate(this.maxDate.getDate() + 1)
    this.subs.push(this.ds.dateSelectors$.pipe(filter(val => !!val)).subscribe(minMax => {
      this.filter = {...this.filter, min_date: minMax.minDate, max_date: minMax.maxDate}
      this.store.dispatch(leadsPageChanged({filter: this.filter}))
      this.store.dispatch(leadsRequired({filter: this.filter}))
    }))
    this.subs.push(this.selectedUser$.pipe(tap( userID => {
      this.filter = {...this.filter, responsible: userID}
      this.store.dispatch(leadsPageChanged({filter: this.filter}))
      this.store.dispatch(leadsRequired({filter: this.filter}))
    })).subscribe())
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

}
