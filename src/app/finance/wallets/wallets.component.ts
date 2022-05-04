import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListFilter, Transfer, Wallet } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { walletsRequired } from 'src/app/state/finance/finance.actions';
import { selectWallets } from 'src/app/state/finance/finance.selectors';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.sass']
})
export class WalletsComponent implements OnInit {
  page_limit = 50
  transfers$: Observable<ReadonlyArray<Transfer>>//select goes here
  total$: Observable<number> //select goes here
  displayedColumns: string[] = ['created', 'wallet', 'category', 'amount'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  minDate = new Date()

  filterSubject: BehaviorSubject<ListFilter>
  filter$: Observable<ListFilter>
  wallets$: Observable<ReadonlyArray<Wallet>> = this.store.select(selectWallets)
  form: FormGroup

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.minDate.setDate(this.minDate.getDate() - 28)
    const filter = {
      limit: this.page_limit,
      offset: 0,
      min_date: this.minDate,
      max_date: new Date(),
      parent: Number(localStorage.getItem("wallet")) || null
    }
    this.filterSubject = new BehaviorSubject<ListFilter>(filter)
    this.filter$ = this.filterSubject.asObservable()
    this.form = this.fb.group({
      minDate: filter.min_date,
      maxDate: filter.max_date,
      wallet: filter.parent
    })
  }

  ngOnInit(): void {
    this.store.dispatch(walletsRequired())
    this.form.valueChanges.subscribe(val => {
      this.filterSubject.next({ ...this.filterSubject.getValue(), min_date: val.minDate, max_date: val.maxDate, parent: val.wallet })
    })
    //TODO: move to before leave
    this.form.get('wallet').valueChanges.subscribe(wallet => localStorage.setItem("wallet", wallet))
    this.route.queryParams
      .subscribe(params => {
        console.log(params)
        // this.store.dispatch(leadsRequired({filter: this.filter}))
        // this.store.dispatch(leadsPageChanged({filter: this.filter}))
        this.paginator && this.paginator.firstPage()
      });
    this.filter$.subscribe(filter => {
      const queryParams: Params = this.filterToParams(filter)
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: '', // remove to replace all query params by provided
        });
    })



  }
  pageChanged(e: PageEvent) {
    const filter = this.filterSubject.getValue()
    this.filterSubject.next({ ...filter, offset: e.pageIndex * filter.limit })
  }

  filterToParams(filter: ListFilter): Params {
    return {
      limit: filter.limit,
      page: filter.offset / filter.limit,
      min_date: filter.min_date,
      max_date: filter.max_date,
      parent: filter.parent
    }
  }
}
