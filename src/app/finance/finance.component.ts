import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lead, ListFilter } from '../shared/model';
import { AppState } from '../state/app.state';
import { walletsRequired } from '../state/finance/finance.actions';
import { selectCurrentPage, selectLeadsCurrentTotal } from '../state/leads/leads.selector';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.sass']
})
export class FinanceComponent implements OnInit {
  filter: ListFilter = {limit: 50, offset: 0, query: ""}
  leads$: Observable<Lead[]> = this.store.select(selectCurrentPage)
  total$: Observable<number>  = this.store.select(selectLeadsCurrentTotal)
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(walletsRequired())
  }

}
