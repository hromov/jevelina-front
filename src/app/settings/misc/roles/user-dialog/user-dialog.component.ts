import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { MiscService } from 'src/app/settings/misc/misc.service';
import { Role, User } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { userChanged, userDeleted } from 'src/app/state/misc/misc.actions';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.sass']
})
export class UserDialogComponent implements AfterViewInit {
  form: FormGroup
  user: User
  roles: Role[] = []
  errorMessage: string = ""
  formatLabel(value: number) {
    return Math.round(value * 100) + '%';
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User,
    private misc: MiscService,
    private store: Store<AppState>,
    private api: ApiService,
  ) {
    this.user = user

    this.form = fb.group({
      Name: [user.Name, Validators.required],
      Email: [user.Email, [Validators.required, Validators.email]],
      Hash: [user.Hash, Validators.required],
      RoleID: [user.RoleID, Validators.required],
      Distribution: [user.Distribution]
    })
    //move to store?
    this.api.Roles().subscribe(roles => this.roles = roles)
  }

  ngAfterViewInit(): void {

  }

  save() {
    if (this.form.value.RoleID.type !== "number") {
      this.form.patchValue({ RoleID: Number(this.form.value.RoleID) })
    }
    const newUser = {
      ...this.user,
      ...this.form.value
    }
    this.misc.SaveUser(newUser).subscribe({
      next: (user) => {
        this.store.dispatch(userChanged({ user: user || newUser }))
        this.dialogRef.close(user || newUser)
      },
      error: (err) => this.errorMessage = `Can't save user error. Duplicate email?`
    })
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.misc.DeleteUser(this.user.ID).subscribe({
      next: () => {
        this.store.dispatch(userDeleted({ userID: this.user.ID }))
        this.dialogRef.close(this.user)
      },
      error: (err) => this.errorMessage = `Can't delete user with ID: ${this.user.ID}`
    })
  }

  get email() { return this.form.get('Email') }
  get name() { return this.form.get('Name') }
  get role() { return this.form.get('RoleID') }

}
