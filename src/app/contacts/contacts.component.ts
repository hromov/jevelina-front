import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { retrievedContactList, setTotal } from '../state/contacts.actions';
import { selectContacts, selectTotal } from '../state/contacts.selectors';

import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  contacts$ = this.store.select(selectContacts);
  total$ = this.store.select(selectTotal)
  constructor(private contactsService: ContactsService, private store: Store) { }

  ngOnInit(): void {
    this.contactsService
      .List()
      .subscribe((resp) => {
        console.log(resp.headers)
        console.log(resp.headers.getAll("X-Total-Count"))
        const total = Number(resp.headers.get("X-Total-Count"))
        this.store.dispatch(setTotal({ total }))
        this.store.dispatch(retrievedContactList({ contacts: resp.body || [] }))
      });
  }

}
