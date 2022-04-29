import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LeadComponent } from './leads/lead/lead.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsTableComponent } from './leads/table/table.component';

const routes: Routes = [
  { path: '', component: LeadsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contacts/:id', component: ContactComponent },
  { path: 'leads', component: LeadsTableComponent},
  { path: 'leads/:id', component: LeadComponent },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
