import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MiscService } from 'src/app/misc/misc.service';
import { Tag } from 'src/app/models/model';

@Component({
  selector: 'app-tags-dialog',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.sass']
})
export class TagsDialogComponent implements AfterViewInit {
  form: FormGroup
  item: Tag
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TagsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) item: Tag,
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
    this.misc.SaveTag(newItem).subscribe({
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
    this.misc.DeleteTag(this.item.ID).subscribe({
      next: () => {
        this.dialogRef.close(this.item)
      },
      error: () => this.errorMessage = `Can't delete item "${this.item.Name}, with ID = ${this.item.ID}"`
    })
  }

  get name() { return this.form.get('Name') }

}
