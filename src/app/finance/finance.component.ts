import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { DateSelectorService } from '../shared/date-selector/date-selector.service';
import { Lead, ListFilter } from '../shared/model';
import { AppState } from '../state/app.state';
import { transfersRequired, walletsRequired } from '../state/finance/finance.actions';
import { selectProfitForPage } from '../state/finance/finance.selectors';
import { leadsPageChanged, leadsRequired } from '../state/leads/leads.actions';
import { selectCurrentPage, selectedUser, selectLeadsCurrentPassiveTotal, selectLeadsCurrentTotal } from '../state/leads/leads.selector';

//TODO: steps hardcoded - make settings to select
const allowed_steps = [1, 4]

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.sass'],
  providers: [DateSelectorService]
})
export class FinanceComponent implements OnInit, OnDestroy {
  filter: ListFilter = {limit: 150, offset: 0, steps: allowed_steps}
  leads$: Observable<Lead[]> = this.store.select(selectCurrentPage).pipe(map(leads => {
    this.store.dispatch(transfersRequired({filter: {ids: leads.map(l => l.ID)}}))
    return leads.filter(l => allowed_steps.includes(l.StepID)).sort(function(a, b) {
      return a.Step.Order - b.Step.Order;
    });
  }))
  total$: Observable<number>  = this.store.select(selectLeadsCurrentPassiveTotal)
  totalProfit$: Observable<number> = this.store.select(selectProfitForPage)
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
