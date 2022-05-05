import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectUserByID } from 'src/app/state/misc/misc.selectors';
import { User } from '../model';

@Component({
  selector: 'user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.sass']
})
export class UserNameComponent implements OnChanges {
  @Input() id: number
  user$: Observable<Readonly<User>>
  constructor(private store: Store<AppState>) { }

  ngOnChanges(): void {
    this.user$ = this.store.select(selectUserByID(this.id)).pipe(first())
  }

}
