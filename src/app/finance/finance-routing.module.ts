import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './finance.component';
import { SettingsComponent } from './settings/settings.component';
import { WalletsComponent } from './wallets/wallets.component';

const routes: Routes = [
  { path: "", component: FinanceComponent },
  { path: 'wallets', component: WalletsComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
