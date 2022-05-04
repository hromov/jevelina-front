import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Tag } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { TagsDialogComponent } from './tags-dialog/tags-dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: '../../../shared/templates/item-list.html',
  styleUrls: ['../../../shared/templates/item-list.sass']
})
export class TagsComponent implements OnInit {
  constructor(private api: ApiService, private shared: SharedService, private dialog: MatDialog) { }
  items: Tag[] = []
  
  ngOnInit(): void {
    this.api.Tags().pipe(first()).subscribe(items => this.items = items)
  }

  editItem(item?: Tag) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(TagsDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.api.Tags().pipe(first()).subscribe(items => this.items = items))
  }

}
