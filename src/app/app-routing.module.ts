import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BasicGuard } from './guards/basic.guard';
import { LeadComponent } from './leads/lead/lead.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsTableComponent } from './leads/table/table.component';
import { RestrictedComponent } from './login/restricted/restricted.component';
import { PrivacyComponent } from './additional/privacy/privacy.component';
import { TermsComponent } from './additional/terms/terms.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', component: LeadsComponent, canActivate: [BasicGuard]},
  { path: 'restricted', component: RestrictedComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [BasicGuard] },
  { path: 'contacts/:id', component: ContactComponent, canActivate: [BasicGuard] },
  { path: 'leads', component: LeadsTableComponent, canActivate: [BasicGuard] },
  { path: 'leads/:id', component: LeadComponent, canActivate: [BasicGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [BasicGuard]},
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
