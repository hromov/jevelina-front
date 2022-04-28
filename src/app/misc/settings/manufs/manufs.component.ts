import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs';
import { Manufacturer } from 'src/app/models/model';
import { SharedService } from 'src/app/shared/shared.service';
import { MiscService } from '../../misc.service';
import { ManufsDialogComponent } from './manufs-dialog/manufs-dialog.component';

@Component({
  selector: 'app-manufs',
  templateUrl: './manufs.component.html',
  styleUrls: ['./manufs.component.sass']
})
export class ManufsComponent implements OnInit {
  constructor(private misc: MiscService, private shared: SharedService, private dialog: MatDialog) { }
  items: Manufacturer[] = []
  
  ngOnInit(): void {
    this.misc.Manufacturers().pipe(first()).subscribe(items => this.items = items)
  }

  editItem(item?: Manufacturer) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(ManufsDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.misc.Manufacturers().pipe(first()).subscribe(items => this.items = items))
  }

}
