import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Role, User } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
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

  constructor(private dialog: MatDialog, private shared: SharedService) { }

  ngOnInit(): void {
  }


  editUser(user: User) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = user
    this.dialog.open(UserDialogComponent, dialogConfig)
  }

  newUser() {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = {}
    this.dialog.open(UserDialogComponent, dialogConfig)
  }

  editRole(role: Role) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = role
    this.dialog.open(RolesDialogComponent, dialogConfig)
  }

  newRole() {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = {}
    this.dialog.open(RolesDialogComponent, dialogConfig)
  }
}
