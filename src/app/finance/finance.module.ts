import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { WalletDialogComponent } from './settings/wallet-dialog/wallet-dialog.component';
import { WalletsComponent } from './wallets/wallets.component';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';
import { TransferChipComponent } from './transfer-chip/transfer-chip.component';


@NgModule({
  declarations: [
    FinanceComponent,
    SettingsComponent,
    WalletDialogComponent,
    WalletsComponent,
    TransferDialogComponent,
    TransferChipComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    SharedModule,
  ]
})
export class FinanceModule { }
