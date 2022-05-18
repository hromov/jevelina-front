import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private dialog: MatDialog) { }

  newDialog(): MatDialogConfig<any> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "400px"
    return dialogConfig
  }

  openTransfer(from: number, to: number, parent: number) {
    const dialogConfig = this.newDialog()
    dialogConfig.data = { From: from, To: to, ParentID: parent || null }
    this.dialog.open(TransferDialogComponent, dialogConfig)
  }
  
}
