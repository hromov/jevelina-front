import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Role, User } from 'src/app/models/model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements OnInit {
  @Input() roles: ReadonlyArray<Role> = []
  @Input() users: ReadonlyArray<User> = []
  constructor() { }

  ngOnInit(): void {
  }

}
