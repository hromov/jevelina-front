import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsComponent } from './contacts/contacts.component';
import { StoreModule } from '@ngrx/store';
import { ContactsListComponent } from './contacts/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
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
import { MiscEffects } from './state/misc/contacts.effects';
import { HoverDirective } from './shared/hover.directive';
import { SearchComponent } from './shared/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    LeadsComponent,
    LeadsListComponent,
    HoverDirective,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    OverlayModule,
    StoreModule.forRoot({ contacts: contactsReducer, leads: leadsReducer, misc: miscsReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ContactsEffects, LeadsEffects, MiscEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
