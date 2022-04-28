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

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    LeadsComponent,
    LeadsListComponent,
    LeadsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MaterialModule,
    // ReactiveFormsModule,
    StoreModule.forRoot({ contacts: contactsReducer, leads: leadsReducer, misc: miscsReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ContactsEffects, LeadsEffects, MiscEffects]),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
