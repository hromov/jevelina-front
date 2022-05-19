import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, first, forkJoin, map, Observable } from 'rxjs';
import { DateSelectorService, MinMax } from 'src/app/shared/date-selector/date-selector.service';
import { ListFilter, Transfer, Wallet } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { transfersPageChanged, transfersRequired, walletsRequired } from 'src/app/state/finance/finance.actions';
import { selectCategories, selectCurrentTransfers, selectCurrentTransfersTotal, selectWallets } from 'src/app/state/finance/finance.selectors';
import { TransferDialogComponent } from '../../shared/transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.sass'],
  providers: [DateSelectorService]
})
export class WalletsComponent implements OnInit {
  transfers$: Observable<ReadonlyArray<Transfer>> = this.store.select(selectCurrentTransfers)
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterSubject: BehaviorSubject<ListFilter>
  filter$: Observable<ListFilter>
  categories$: Observable<string[]> = this.store.select(selectCategories)
  wallets$: Observable<ReadonlyArray<Wallet>> = this.store.select(selectWallets)
  walletControl: FormControl = new FormControl()
  categoryControl: FormControl = new FormControl()
  //init values
  minDate = new Date()
  maxDate = new Date()

  constructor(
    private store: Store<AppState>,
    private shared: SharedService,
    private dialog: MatDialog,
    private ds: DateSelectorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {    
    this.route.queryParams.pipe(first()).subscribe((params) => {
      this.setInitValues(params)
      
      const filter: ListFilter = {
        limit: 50,
        offset: 0,
        query: this.categoryControl.value,
        min_date: this.minDate,
        max_date: this.maxDate,
        wallet: this.walletControl.value,
      }
      this.filterSubject = new BehaviorSubject<ListFilter>(filter)
      this.filter$ = this.filterSubject.asObservable()
    })
  }

  transfer(from?: boolean, to?: boolean) {
    const dialogConfig = this.shared.newDialog()
    const wallet = this.filterSubject.getValue().wallet
    dialogConfig.data = { From: from ? wallet : null, To: to ? wallet : null }
    console.log(dialogConfig.data)
    this.dialog.open(TransferDialogComponent, dialogConfig)
  }

  pageChanged(e: PageEvent) {
    this.updateFilter({offset: e.pageIndex * e.pageSize})
  }

  ngOnInit(): void {
    this.store.dispatch(walletsRequired())
    this.walletControl.valueChanges.subscribe(val => {
      this.updateFilter({wallet: val})
      this.paginator && this.paginator.firstPage()
      //TODO: move to on exit
      localStorage.setItem("wallet", val)
    })
    this.categoryControl.valueChanges.subscribe(val => {
      this.updateFilter({query: val})
      this.paginator && this.paginator.firstPage()
    })
    this.ds.dateSelectors$.pipe(filter(val => !!val)).subscribe((minMax: MinMax) => {
      this.updateFilter({min_date: minMax.minDate, max_date: minMax.maxDate})
    })
    this.filter$.subscribe(filter => {
      this.store.dispatch(transfersRequired({ filter }))
      this.store.dispatch(transfersPageChanged({ filter }))
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

  updateFilter(filter: ListFilter) {
    const oldFilter = this.filterSubject.getValue()
    if (!(oldFilter.min_date === filter.min_date && oldFilter.max_date === filter.max_date)) {
      this.filterSubject.next({ ...oldFilter, ...filter })
    }
  }

  filterToParams(filter: ListFilter): Params {
      return {
        wallet: filter.wallet,
        category: filter.query,
        minDate: filter.min_date,
        maxDate: filter.max_date,
        limit: filter.limit,
        page: filter.offset / filter.limit,
    }
  }

  setInitValues(params: Params) {
    if (params['minDate'] !== undefined) {
      this.minDate = new Date(params['minDate'])
    } else {
      this.minDate.setDate(this.minDate.getDate() - 28)
    }

    if (params['maxDate'] !== undefined) {
      this.maxDate = new Date(params['maxDate'])
    } else {
      this.maxDate.setDate(this.maxDate.getDate() + 1)
    }

    if (params['wallet'] !== undefined) {
      this.walletControl.setValue(Number(params['wallet']))
    } else {
      this.walletControl.setValue(Number(localStorage.getItem("wallet")) || "")
    }

    if (params['category'] !== undefined) {
      this.categoryControl.setValue(params['category'])
    }
  }
}
