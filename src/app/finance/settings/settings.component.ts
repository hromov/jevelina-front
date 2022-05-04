import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Wallet } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { retrievedWallets } from 'src/app/state/finance/finance.actions';
import { selectWallets } from 'src/app/state/finance/finance.selectors';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  wallets$: Observable<ReadonlyArray<Wallet>> = this.store.select(selectWallets)
  constructor(private fs: FinanceService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.fs.Wallets().pipe(first()).subscribe(wallets => this.store.dispatch(retrievedWallets({wallets})))
  }

  editWallet(wallet?: Wallet) {
    console.log(wallet)
  }

}
