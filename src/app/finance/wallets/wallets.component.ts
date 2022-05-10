import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { DateSelectorService, MinMax } from 'src/app/shared/date-selector/date-selector.service';
import { ListFilter, Transfer, Wallet } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { transfersPageChanged, transfersRequired, walletsRequired } from 'src/app/state/finance/finance.actions';
import { selectCurrentTransfers, selectCurrentTransfersTotal, selectWallets } from 'src/app/state/finance/finance.selectors';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.sass'],
  providers: [DateSelectorService]
})
export class WalletsComponent implements OnInit {
  page_limit = 50
  transfers$: Observable<ReadonlyArray<Transfer>> = this.store.select(selectCurrentTransfers)
  total$: Observable<number> = this.store.select(selectCurrentTransfersTotal)
  displayedColumns: string[] = ['created', 'wallet', 'category', 'amount'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterSubject: BehaviorSubject<ListFilter>
  filter$: Observable<ListFilter>
  wallets$: Observable<ReadonlyArray<Wallet>> = this.store.select(selectWallets)
  walletControl: FormControl = new FormControl(Number(localStorage.getItem("wallet")) || null)
  //init values
  minDate = new Date()
  maxDate = new Date()

  constructor(
    private store: Store<AppState>,
    private shared: SharedService,
    private dialog: MatDialog,
    private ds: DateSelectorService,
  ) {

    const filter: ListFilter = {
      limit: this.page_limit,
      offset: 0,
      min_date: this.minDate,
      max_date: this.maxDate,
      wallet: this.walletControl.value
    }
    this.filterSubject = new BehaviorSubject<ListFilter>(filter)
    this.filter$ = this.filterSubject.asObservable()
  }

  transfer(from?: boolean, to?: boolean) {
    const dialogConfig = this.shared.newDialog()
    const wallet = this.filterSubject.getValue().wallet
    dialogConfig.data = { From: from ? wallet : null, To: to ? wallet : null }
    this.dialog.open(TransferDialogComponent, dialogConfig)
  }

  pageChanged(e: PageEvent) {
    const filter = this.filterSubject.getValue()
    this.filterSubject.next({ ...filter, offset: e.pageIndex * filter.limit })
  }

  ngOnInit(): void {
    //for init values only
    this.minDate.setDate(this.minDate.getDate() - 28)
    this.maxDate.setDate(this.maxDate.getDate() + 1)

    this.store.dispatch(walletsRequired())
    this.walletControl.valueChanges.subscribe(val => {
      this.filterSubject.next({ ...this.filterSubject.getValue(), wallet: val })
      this.paginator && this.paginator.firstPage()
      //TODO: move to on exit
      localStorage.setItem("wallet", val)
    })
    this.ds.dateSelectors$.pipe(filter(val => !!val)).subscribe((minMax: MinMax) => {
      this.filterSubject.next({ ...this.filterSubject.getValue(), min_date: minMax.minDate, max_date: minMax.maxDate })
    })
    this.filter$.subscribe(filter => {
      this.store.dispatch(transfersRequired({ filter }))
      this.store.dispatch(transfersPageChanged({ filter }))
    })

    //TODO: make use of it    
    // this.route.queryParams
    //   .subscribe(params => {
    //     this.paginator && this.paginator.firstPage()
    //   });
    // this.filter$.subscribe(filter => {
    //   const queryParams: Params = this.filterToParams(filter)
    //   this.store.dispatch(transfersRequired({ filter }))
    //   this.store.dispatch(transfersPageChanged({ filter }))
    //   this.router.navigate(
    //     [],
    //     {
    //       relativeTo: this.route,
    //       queryParams: queryParams,
    //       queryParamsHandling: '', // remove to replace all query params by provided
    //     });
    // })
  }

  // filterToParams(filter: ListFilter): Params {
  //   return {
  //     limit: filter.limit,
  //     page: filter.offset / filter.limit,
  //     min_date: filter.min_date,
  //     max_date: filter.max_date,
  //     wallet: filter.wallet
  //   }
  // }
}
