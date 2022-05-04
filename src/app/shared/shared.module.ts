import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HoverDirective } from './hover.directive';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AnalyticsComponent } from './analytics/analytics.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StepsSelectorComponent } from './steps-selector/steps-selector.component';
import {MatMenuModule} from '@angular/material/menu';
import { LeadsListComponent } from './leads-list/leads-list.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    HoverDirective,
    SearchComponent,
    ErrorComponent,
    AnalyticsComponent,
    TasksComponent,
    TaskComponent,
    StepsSelectorComponent,
    LeadsListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    RouterModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,    
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSliderModule,
  ],
  exports: [
    HoverDirective,
    SearchComponent,
    ErrorComponent,
    OverlayModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,    
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    AnalyticsComponent,
    MatExpansionModule,
    TasksComponent,
    MatDatepickerModule,
    StepsSelectorComponent,
    MatMenuModule,
    LeadsListComponent,
    TaskComponent,
    MatSliderModule,
  ],
  providers:[
    MatNativeDateModule
  ]
})
export class SharedModule { }
