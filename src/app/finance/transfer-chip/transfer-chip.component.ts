import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Transfer } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'transfer-chip',
  templateUrl: './transfer-chip.component.html',
  styleUrls: ['./transfer-chip.component.sass']
})
export class TransferChipComponent implements OnInit {
  @Input() transfer: Transfer
  constructor(private dialog: MatDialog, private shared: SharedService) { }

  ngOnInit(): void {
  }
  get sign() {
    return !this.transfer.To ? ' -' : !this.transfer.From ? ' +' : ''
  }
  open() {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = this.transfer
    this.dialog.open(TransferDialogComponent, dialogConfig)
  }
}
