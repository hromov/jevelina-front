import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import { Tag } from 'src/app/models/model';
import { SharedService } from 'src/app/shared/shared.service';
import { MiscService } from '../../misc.service';
import { TagsDialogComponent } from './tags-dialog/tags-dialog.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.sass']
})
export class TagsComponent implements OnInit {
  constructor(private misc: MiscService, private shared: SharedService, private dialog: MatDialog) { }
  items: Tag[] = []
  
  ngOnInit(): void {
    this.misc.Tags().pipe(first()).subscribe(items => this.items = items)
  }

  editItem(item?: Tag) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(TagsDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.misc.Tags().pipe(first()).subscribe(items => this.items = items))
  }

}
