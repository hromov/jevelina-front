import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Contact, ListFilter } from '../models/model';

import { ContactsService } from './contacts.service';
import { selectAllContacts, selectContactsTotal, selectFilteredContacts } from '../state/cotacts/contacts.selectors';
import { contactsRequired, retrievedContactsList } from '../state/cotacts/contacts.actions';
import { map, Observable, of } from 'rxjs';
import { FilterToString } from '../api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  limit = 25
  offset = 0
  contacts$: Observable<Contact[]> = this.store.select(selectAllContacts).pipe(map(contacts => {
    const last = this.limit + this.offset
    // console.log(this.offset, this.limit + this.offset)
    return contacts.slice(this.offset, contacts.length < last ? contacts.length : last)
  }));
  total$: Observable<number> = this.store.select(selectContactsTotal(FilterToString({limit: this.limit, offset: this.offset})));
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(contactsRequired({filter: {limit: this.limit, offset: this.offset}}))
  }
  pageChanged(e: PageEvent) {
    console.log(e)
    // seems like it doesnt wark backward for now - no events
    this.offset = e.pageIndex * this.limit
    this.store.dispatch(contactsRequired({filter: {limit: this.limit, offset: this.offset}}))
  }

  

}
