import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { RolesDialogComponent } from './misc/roles/roles-dialog/roles-dialog.component';
import { StepsComponent } from './misc/steps/steps.component';
import { StepComponent } from './misc/steps/step/step.component';
import { SourcesComponent } from './misc/sources/sources.component';
import { SourceDialogComponent } from './misc/sources/source-dialog/source-dialog.component';
import { TagsComponent } from './misc/tags/tags.component';
import { TagsDialogComponent } from './misc/tags/tags-dialog/tags-dialog.component';
import { TaskTypesComponent } from './misc/task-types/task-types.component';
import { TaskTypesDialogComponent } from './misc/task-types/task-types-dialog/task-types-dialog.component';
import { ProductsComponent } from './misc/products/products.component';
import { ProductDialogComponent } from './misc/products/product-dialog/product-dialog.component';
import { ManufsComponent } from './misc/manufs/manufs.component';
import { ManufsDialogComponent } from './misc/manufs/manufs-dialog/manufs-dialog.component';
import { SettingsComponent } from './settings.component';
import { RolesComponent } from './misc/roles/roles.component';
import { UserDialogComponent } from './misc/roles/user-dialog/user-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsGuard } from '../guards/settings.guard';


@NgModule({
  declarations: [
    RolesDialogComponent,
    StepComponent,
    SourceDialogComponent,
    TagsComponent,
    TagsDialogComponent,
    TaskTypesComponent,
    TaskTypesDialogComponent,
    ProductsComponent,
    ProductDialogComponent,
    ManufsComponent,
    ManufsDialogComponent,
    SettingsComponent,
    RolesComponent,
    UserDialogComponent,
    StepsComponent,
    SourcesComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ],
  providers: [SettingsGuard]
})
export class SettingsModule {}
