import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
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
    public auth: AuthService
  ) {
    this.transfer = transfer
    console.log(transfer)
    this.form = fb.group({
      From: [transfer.From],
      To: [transfer.To],
      Amount: [transfer.Amount],
      Category: [transfer.Category],
      Description: [transfer.Description]
    })
    console.log(this.form.value)
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

  complete() {
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
    this.fs.SaveTransfer(newTransfer).pipe(concatMap(transfer => {
      this.store.dispatch(transferChanged({ transfer: transfer || newTransfer }))
      return this.fs.CompleteTransfer(transfer.ID).pipe(map(res => transfer))
    })).subscribe({
      next: (transfer: Transfer) => {
        transfer.Completed = true
        this.store.dispatch(transferChanged({ transfer: transfer }))
        this.dialogRef.close(transfer || newTransfer)
      },
      error: (err) => this.errorMessage = `Can't save complete error`
    })

  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    if (confirm("Are you sure wan't to delete transfer?")) {
      this.fs.DeleteTransfer(this.transfer.ID).subscribe({
        next: () => {
          this.store.dispatch(transferDeleted({ ID: this.transfer.ID }))
          this.dialogRef.close()
        },
        error: (err) => this.errorMessage = `Can't delete transfer with ID: ${this.transfer.ID}`
      })
    }
  }

}
