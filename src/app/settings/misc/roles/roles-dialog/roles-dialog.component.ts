import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MiscService } from 'src/app/settings/misc/misc.service';
import { Role } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { roleChanged, roleDeleted } from 'src/app/state/misc/misc.actions';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.sass']
})
export class RolesDialogComponent implements AfterViewInit {
  form: FormGroup
  role: Role
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RolesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) role: Role,
    private misc: MiscService,
    private store: Store<AppState>
  ) {
    this.role = role

    this.form = fb.group({
      Role: [role.Role, Validators.required],
    })
  }

  ngAfterViewInit(): void {

  }

  save() {
    const newRole = {
      ...this.role,
      ...this.form.value
    }
    this.misc.SaveRole(newRole).subscribe({
      next: (role) => {
        this.dialogRef.close(role)
        this.store.dispatch(roleChanged({ role: role || newRole }))
      },
      error: () => this.errorMessage = `Can't save user error. Duplicate email?`
    })
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.misc.DeleteRole(this.role.ID).subscribe({
      next: () => {
        this.dialogRef.close(this.role)
        this.store.dispatch(roleDeleted({ roleID: this.role.ID }))
      },
      error: () => this.errorMessage = `Can't delete role with ID: ${this.role.ID}`
    })
  }

  get roleField() { return this.form.get('Role') }

}
