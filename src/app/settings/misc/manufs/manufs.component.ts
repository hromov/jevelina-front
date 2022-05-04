import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Manufacturer } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { retrievedManufacturers } from 'src/app/state/misc/misc.actions';
import { MiscService } from '../misc.service';
import { ManufsDialogComponent } from './manufs-dialog/manufs-dialog.component';

@Component({
  selector: 'app-manufs',
  templateUrl: '../../../shared/templates/item-list.html',
  styleUrls: ['../../../shared/templates/item-list.sass']
})
export class ManufsComponent implements OnInit {
  constructor(private api: ApiService, private shared: SharedService, private dialog: MatDialog, private store: Store<AppState>) { }
  items: Manufacturer[] = []

  ngOnInit(): void {
    this.api.Manufacturers().pipe(first()).subscribe(items => {
      this.items = items
      this.store.dispatch(retrievedManufacturers({ manufacturers: items || [] }))
    })
  }

  editItem(item?: Manufacturer) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(ManufsDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.api.Manufacturers().pipe(first())
        .subscribe(items => {
          this.items = items
          this.store.dispatch(retrievedManufacturers({ manufacturers: items || [] }))
        })
      )
  }

}
