import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsGuard } from '../guards/settings.guard';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    canActivate: [SettingsGuard],
    canActivateChild: [SettingsGuard],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
