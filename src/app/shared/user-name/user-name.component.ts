import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectUserByID } from 'src/app/state/misc/misc.selectors';
import { User } from '../model';

@Component({
  selector: 'user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.sass']
})
export class UserNameComponent implements OnInit {
  @Input() id: number
  user$: Observable<Readonly<User>>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUserByID(this.id))
  }

}
