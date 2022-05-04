import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { WalletDialogComponent } from './settings/wallet-dialog/wallet-dialog.component';


@NgModule({
  declarations: [
    FinanceComponent,
    SettingsComponent,
    WalletDialogComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    SharedModule,
  ]
})
export class FinanceModule { }
