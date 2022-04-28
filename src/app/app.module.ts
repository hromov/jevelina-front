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
import { MiscEffects } from './state/misc/misc.effects';
import { HoverDirective } from './shared/hover.directive';
import { SearchComponent } from './shared/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';
import { LeadsTableComponent } from './leads/table/table.component';
import { SettingsComponent } from './misc/settings/settings.component';
import { RolesComponent } from './misc/settings/roles/roles.component';
import { UserDialogComponent } from './misc/settings/roles/user-dialog/user-dialog.component';
import { ErrorComponent } from './shared/error/error.component';
import { RolesDialogComponent } from './misc/settings/roles/roles-dialog/roles-dialog.component';
import { StepsComponent } from './misc/settings/steps/steps.component';
import { StepComponent } from './misc/settings/steps/step/step.component';
import { SourcesComponent } from './misc/settings/sources/sources.component';
import { SourceDialogComponent } from './misc/settings/sources/source-dialog/source-dialog.component';
import { TagsComponent } from './misc/settings/tags/tags.component';
import { TagsDialogComponent } from './misc/settings/tags/tags-dialog/tags-dialog.component';
import { TaskTypesComponent } from './misc/settings/task-types/task-types.component';
import { TaskTypesDialogComponent } from './misc/settings/task-types/task-types-dialog/task-types-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    LeadsComponent,
    LeadsListComponent,
    HoverDirective,
    SearchComponent,
    LeadsTableComponent,
    SettingsComponent,
    RolesComponent,
    UserDialogComponent,
    ErrorComponent,
    RolesDialogComponent,
    StepsComponent,
    StepComponent,
    SourcesComponent,
    SourceDialogComponent,
    TagsComponent,
    TagsDialogComponent,
    TaskTypesComponent,
    TaskTypesDialogComponent,
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
