import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import { MiscService } from 'src/app/misc/misc.service';
import { Role, User } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { userChanged, userDeleted } from 'src/app/state/misc/misc.actions';

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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) user: User,
    private misc: MiscService,
    private store: Store<AppState>
  ) {
    this.user = user

    this.form = fb.group({
      Name: [user.Name, Validators.required],
      Email: [user.Email, [Validators.required, Validators.email]],
      RoleID: [user.RoleID, Validators.required],
    })
    //move to store?
    this.misc.Roles().subscribe(roles => this.roles = roles)
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
