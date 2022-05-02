import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactsComponent } from './contacts/contacts.component';
import { StoreModule } from '@ngrx/store';
import { ContactsListComponent } from './contacts/list/list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LeadsComponent } from './leads/leads.component';
import { contactsReducer } from './state/cotacts/contacts.reducer';
import { ContactsEffects } from './state/cotacts/contacts.effects';
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
import { TasksEffects } from './state/tasks/tasks.effects';
import { tasksReducer } from './state/tasks/tasks.reducer';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './login/auth.interceptor';
import { RestrictedComponent } from './login/restricted/restricted.component';
import { BasicGuard } from './guards/basic.guard';
import { PrivacyComponent } from './additional/privacy/privacy.component';
import { TermsComponent } from './additional/terms/terms.component';
import { LeadsStepComponent } from './leads/leads-step/leads-step.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskColComponent } from './task-list/task-col/task-col.component';

const AuthClientID = "242989016972-gd8oksvs6b9cnlach1evv332tbrlkm7f.apps.googleusercontent.com"

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactsListComponent,
    LeadsComponent,
    LeadsTableComponent,
    ContactComponent,
    ContactDataComponent,
    LeadComponent,
    LeadDataComponent,
    LoginComponent,
    RestrictedComponent,
    PrivacyComponent,
    TermsComponent,
    LeadsStepComponent,
    TaskListComponent,
    TaskColComponent,
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // MaterialModule,
    // ReactiveFormsModule,
    StoreModule.forRoot({ contacts: contactsReducer, leads: leadsReducer, misc: miscsReducer, tasks: tasksReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ContactsEffects, LeadsEffects, MiscEffects, TasksEffects]),
    SharedModule,
    SocialLoginModule,
  ],
  providers: [
    BasicGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              AuthClientID
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(AuthClientID)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
