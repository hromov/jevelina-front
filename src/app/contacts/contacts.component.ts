import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { retrievedContactList } from '../state/cotacts/contacts.actions';
import { ListFilter } from '../models/model';

import { ContactsService } from './contacts.service';
import { selectCurrent, selectTotal } from '../state/cotacts/contacts.selectors';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  contacts$ = this.store.select(selectCurrent);
  total$ = this.store.select(selectTotal);
  constructor(private contactsService: ContactsService, private store: Store<AppState>) { }

  ngOnInit(): void {
    const filter: ListFilter = {limit: 25, offset: 0}
    this.contactsService
      .List(filter)
      .subscribe((resp) => {
        const total = Number(resp.headers.get("X-Total-Count"))
        this.store.dispatch(retrievedContactList({ contacts: resp.body || [], total: total, current: filter }))
      });
  }

  

}
