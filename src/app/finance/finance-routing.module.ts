import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGuard } from '../guards/basic.guard';
import { SettingsGuard } from '../guards/settings.guard';
import { CategoriesComponent } from './analytics/categories/categories.component';
import { CategoryComponent } from './analytics/categories/category/category.component';
import { FinanceComponent } from './finance.component';
import { SettingsComponent } from './settings/settings.component';
import { WalletsComponent } from './wallets/wallets.component';

const routes: Routes = [
  { path: "", component: FinanceComponent, canActivate: [BasicGuard]  },
  { path: 'wallets', component: WalletsComponent, canActivate: [SettingsGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [SettingsGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [SettingsGuard] },
  { path: 'categories/:category', component: CategoryComponent, canActivate: [SettingsGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
