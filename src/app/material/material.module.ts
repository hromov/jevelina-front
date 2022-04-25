import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ]
})
export class MaterialModule { }
