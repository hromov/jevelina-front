import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGuard } from '../guards/basic.guard';
import { SettingsGuard } from '../guards/settings.guard';
import { FinanceComponent } from './finance.component';
import { SettingsComponent } from './settings/settings.component';
import { WalletsComponent } from './wallets/wallets.component';

const routes: Routes = [
  { path: "", component: FinanceComponent, canActivate: [BasicGuard]  },
  { path: 'wallets', component: WalletsComponent, canActivate: [SettingsGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [SettingsGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
