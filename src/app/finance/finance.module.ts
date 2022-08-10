import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { WalletDialogComponent } from './settings/wallet-dialog/wallet-dialog.component';
import { WalletsComponent } from './wallets/wallets.component';
import { CategoriesComponent } from './analytics/categories/categories.component';
import { CashflowComponent } from './analytics/cashflow/cashflow.component';
import { TransfersTableComponent } from './transfers-table/transfers-table.component';
import { EventsComponent } from './events/events.component';
import { LeadsComponent } from './analytics/leads/leads.component';


@NgModule({
  declarations: [
    FinanceComponent,
    SettingsComponent,
    WalletDialogComponent,
    WalletsComponent,
    CategoriesComponent,
    CashflowComponent,
    TransfersTableComponent,
    EventsComponent,
    LeadsComponent,
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    SharedModule,
  ]
})
export class FinanceModule { }
