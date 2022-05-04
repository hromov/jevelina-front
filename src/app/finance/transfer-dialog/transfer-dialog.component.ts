import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Transfer } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { transferChanged, transferDeleted } from 'src/app/state/finance/finance.actions';
import { selectWallets } from 'src/app/state/finance/finance.selectors';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.sass']
})
export class TransferDialogComponent implements AfterViewInit {
  form: FormGroup
  transfer: Transfer
  wallets$ = this.store.select(selectWallets)
  errorMessage: string = ""
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) transfer: Transfer,
    private fs: FinanceService,
    private store: Store<AppState>,
  ) {
    this.transfer = transfer

    this.form = fb.group({
      From: [transfer.From],
      To: [transfer.To],
      Amount: [transfer.Amount],
      Category: [transfer.Category]
    })
  }

  ngAfterViewInit(): void {

  }

  save() {
    if (this.form.value.From && this.form.value.From.type !== "number") {
      this.form.patchValue({ From: Number(this.form.value.From) })
    }
    if (this.form.value.To && this.form.value.To.type !== "number") {
      this.form.patchValue({ To: Number(this.form.value.To) })
    }
    const newTransfer = {
      ...this.transfer,
      ...this.form.value
    }
    this.fs.SaveTransfer(newTransfer).subscribe({
      next: (transfer) => {
        this.store.dispatch(transferChanged({ transfer: transfer || newTransfer }))
        this.dialogRef.close(transfer || newTransfer)
      },
      error: (err) => this.errorMessage = `Can't save transfer error`
    })
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.fs.DeleteTransfer(this.transfer.ID).subscribe({
      next: () => {
        this.store.dispatch(transferDeleted({ ID: this.transfer.ID }))
        this.dialogRef.close()
      },
      error: (err) => this.errorMessage = `Can't delete transfer with ID: ${this.transfer.ID}`
    })
  }

}
