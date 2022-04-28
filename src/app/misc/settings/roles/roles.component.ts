import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Role, User } from 'src/app/models/model';
import { RolesDialogComponent } from './roles-dialog/roles-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements OnInit {
  @Input() roles: ReadonlyArray<Role> = []
  @Input() users: ReadonlyArray<User> = []

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  editUser(user: User) {
    const dialogConfig = this.newDialog()
    dialogConfig.data = user
    this.dialog.open(UserDialogComponent, dialogConfig)
  }

  newUser() {
    const dialogConfig = this.newDialog()
    dialogConfig.data = {}
    this.dialog.open(UserDialogComponent, dialogConfig)
  }

  editRole(role: Role) {
    const dialogConfig = this.newDialog()
    dialogConfig.data = role
    this.dialog.open(RolesDialogComponent, dialogConfig)
  }

  newRole() {
    const dialogConfig = this.newDialog()
    dialogConfig.data = {}
    this.dialog.open(RolesDialogComponent, dialogConfig)
  }

  newDialog(): MatDialogConfig<any> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "400px"
    return dialogConfig
  }

}
