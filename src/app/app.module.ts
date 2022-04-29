import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsComponent } from './contacts/contacts.component';
import { StoreModule } from '@ngrx/store';
import { ContactsListComponent } from './contacts/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LeadsComponent } from './leads/leads.component';
import { contactsReducer } from './state/cotacts/contacts.reducer';
import { ContactsEffects } from './state/cotacts/contacts.effects';
import { LeadsListComponent } from './leads/list/list.component';
import { leadsReducer } from './state/leads/leads.reducer';
import { LeadsEffects } from './state/leads/leads.effects';
import { miscsReducer } from './state/misc/misc.reducer';
import { MiscEffects } from './state/misc/misc.effects';
import { LeadsTableComponent } from './leads/table/table.component';
import { SharedModule } from './shared/shared.module';
import { ContactComponent } from './contacts/contact/contact.component';
import { ContactDataComponent } from './contacts/contact/contact-data/contact-data.component';
import { LeadComponent } from './leads/lead/lead.component';
import { LeadDataComponent } from './leads/lead/lead-data/lead-data.component';
import { CommonModule } from '@angular/common';
import { TasksEffects } from './state/tasks/tasks.effects';
import { tasksReducer } from './state/tasks/tasks.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    LeadsComponent,
    LeadsListComponent,
    LeadsTableComponent,
    ContactComponent,
    ContactDataComponent,
    LeadComponent,
    LeadDataComponent,
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MaterialModule,
    // ReactiveFormsModule,
    StoreModule.forRoot({ contacts: contactsReducer, leads: leadsReducer, misc: miscsReducer, tasks: tasksReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ContactsEffects, LeadsEffects, MiscEffects, TasksEffects]),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
