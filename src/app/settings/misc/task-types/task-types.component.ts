import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { TaskType } from 'src/app/models/model';
import { SharedService } from 'src/app/shared/shared.service';
import { MiscService } from '../misc.service';
import { TaskTypesDialogComponent } from './task-types-dialog/task-types-dialog.component';

@Component({
  selector: 'app-task-types',
  templateUrl: '../templates/item-list.html',
  styleUrls: ['../templates/item-list.sass']
})
export class TaskTypesComponent implements OnInit {
  constructor(private api: ApiService, private shared: SharedService, private dialog: MatDialog) { }
  items: TaskType[] = []
  
  ngOnInit(): void {
    this.api.TaskTypes().pipe(first()).subscribe(items => this.items = items)
  }

  editItem(item?: TaskType) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(TaskTypesDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.api.TaskTypes().pipe(first()).subscribe(items => this.items = items))
  }
}
