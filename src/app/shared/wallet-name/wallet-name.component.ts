import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectWalletByID, selectWallets } from 'src/app/state/finance/finance.selectors';
import { Wallet } from '../model';

@Component({
  selector: 'wallet-name',
  templateUrl: './wallet-name.component.html',
  styleUrls: ['./wallet-name.component.sass']
})
export class WalletNameComponent implements OnInit {
  @Input() id: number
  wallet$: Observable<Readonly<Wallet>>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.wallet$ = this.store.select(selectWalletByID(this.id))
  }

}
