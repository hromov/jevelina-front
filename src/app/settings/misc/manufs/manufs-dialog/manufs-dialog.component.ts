import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MiscService } from 'src/app/settings/misc/misc.service';
import { Manufacturer } from 'src/app/models/model';

@Component({
  selector: 'app-manufs-dialog',
  templateUrl: '../../templates/name-dialog.html',
  styleUrls: ['../../templates/name-dialog.sass']
})
export class ManufsDialogComponent implements AfterViewInit {
  form: FormGroup
  item: Manufacturer
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ManufsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) item: Manufacturer,
    private misc: MiscService,
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
    this.misc.SaveManufacturer(newItem).subscribe({
      next: (item) => {
        this.dialogRef.close(item || newItem)
      },
      error: () => this.errorMessage = `Can't save item "${this.item.Name}, with ID = ${this.item.ID}"`
    })
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.misc.DeleteManufacturer(this.item.ID).subscribe({
      next: () => {
        this.dialogRef.close(this.item)
      },
      error: () => this.errorMessage = `Can't delete item "${this.item.Name}, with ID = ${this.item.ID}"`
    })
  }

  get name() { return this.form.get('Name') }

}
