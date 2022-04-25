import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsComponent } from './contacts/contacts.component';
import { contactsReducer } from './state/contacts.reducer';
import { StoreModule } from '@ngrx/store';
import { ListComponent } from './contacts/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './state/contacts.effects';
import { LeadsComponent } from './leads/leads.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ListComponent,
    LeadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    StoreModule.forRoot({ contacts: contactsReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ContactsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
