import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, of, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { File, Transfer } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { transferChanged, transferDeleted } from 'src/app/state/finance/finance.actions';
import { selectCategories, selectWallets } from 'src/app/state/finance/finance.selectors';
import { FinanceService } from '../../finance/finance.service';

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.sass']
})
export class TransferDialogComponent implements AfterViewInit {
  form: FormGroup
  transfer: Transfer
  wallets$ = this.store.select(selectWallets)
  categories$ = this.store.select(selectCategories)
  errorMessage: string = ""
  files: File[] = []
  isTransfer: boolean
  disabled: boolean
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) transfer: Transfer,
    private fs: FinanceService,
    private store: Store<AppState>,
    public auth: AuthService
  ) {
    this.transfer = transfer
    if (transfer.From && transfer.To) {
      this.isTransfer = true
    }
    this.form = fb.group({
      From: [transfer.From || 1],
      To: [transfer.To || 1],
      Amount: [transfer.Amount],
      Category: [this.isTransfer ? 'Transfer' : transfer.Category, Validators.required],
      Description: [transfer.Description]
    })
    if (this.transfer.Completed || this.transfer.DeletedAt) {
      this.form.disable()
      this.form.get('Category').enable()
      this.form.get('Description').enable()
      this.disabled = true
    }
    
  }

  get same() {
    return this.disabled ? false : this.form.value.From == this.form.value.To
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
    this.fs.SaveTransfer(newTransfer).pipe(
      concatMap(resp => {
        const transfer = resp || newTransfer
        this.store.dispatch(transferChanged({ transfer: transfer }))
        return this.fs.CompleteTransfer(transfer.ID).pipe(map(res => transfer))
      }),
      // tap(console.log),
      catchError(err => {
        this.errorMessage = `Can't save transfer with ID: ${this.transfer.ID}`
        return of(err)
      })
    ).subscribe({
      next: (transfer: Transfer) => {
        const completed: Transfer = {
          ...transfer,
          Completed: true
        }
        this.store.dispatch(transferChanged({ transfer: completed }))
        //return new only if we need to change total in root
        this.dialogRef.close(completed)
      },
      error: (err) => this.errorMessage = `Can't complete error: ${err}`
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
        error: () => this.errorMessage = `Can't delete transfer with ID: ${this.transfer.ID}`
      })
    }
  }
}
