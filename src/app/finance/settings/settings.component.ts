import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first, Observable, tap } from 'rxjs';
import { Wallet } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { retrievedWallets, walletChanged, walletsRequired } from 'src/app/state/finance/finance.actions';
import { selectWallets } from 'src/app/state/finance/finance.selectors';
import { FinanceService } from '../finance.service';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  wallets$: Observable<ReadonlyArray<Wallet>> = this.store.select(selectWallets)
  constructor(private fs: FinanceService, private store: Store<AppState>, private shared: SharedService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(walletsRequired())
  }

  editWallet(item?: Wallet) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(WalletDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!)).subscribe()
  }

}
