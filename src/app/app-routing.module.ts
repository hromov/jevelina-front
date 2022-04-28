import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsTableComponent } from './leads/table/table.component';
import { SettingsComponent } from './misc/settings/settings.component';

const routes: Routes = [
  { path: '', component: LeadsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'leads', component: LeadsTableComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
