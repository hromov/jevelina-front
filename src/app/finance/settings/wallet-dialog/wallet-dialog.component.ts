import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Wallet } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { walletChanged, walletDeleted } from 'src/app/state/finance/finance.actions';
import { FinanceService } from '../../finance.service';

@Component({
  selector: 'app-wallet-dialog',
  templateUrl: '../../../shared/templates/name-dialog.html',
  styleUrls: ['../../../shared/templates/name-dialog.sass']
})
export class WalletDialogComponent implements AfterViewInit {
  form: FormGroup
  item: Wallet
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WalletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) item: Wallet,
    private fs: FinanceService,
    private store: Store<AppState>
  ) {
    this.item = item

    this.form = fb.group({
      Name: [item.Name, Validators.required],
    })
  }

  ngAfterViewInit(): void {

  }

  save() {
    const newItem = {
      ...this.item,
      ...this.form.value
    }
    this.fs.SaveWallet(newItem).subscribe({
      next: (item) => {
        this.dialogRef.close(item || newItem)
        this.store.dispatch(walletChanged({wallet: item || newItem}))
      },
      error: () => this.errorMessage = `Can't save item "${this.item.Name}, with ID = ${this.item.ID}"`
    })
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.fs.DeleteWallet(this.item.ID).subscribe({
        next: () => {
          this.store.dispatch(walletDeleted({ID: this.item.ID}))
          this.dialogRef.close(this.item)
        },
        error: () => this.errorMessage = `Can't delete item "${this.item.Name}, with ID = ${this.item.ID}"`
      })
    }
  }

  get name() { return this.form.get('Name') }

}
