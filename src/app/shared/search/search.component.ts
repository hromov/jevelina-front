import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concatMap, debounce, debounceTime, delay, exhaustMap, filter, forkJoin, map, Observable, startWith, Subscription, tap } from 'rxjs';
import { FilterToString } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { LeadsService } from 'src/app/leads/leads.service';
import { Contact, Lead, ListFilter } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { contactsRequired, contactsSearchChanged } from 'src/app/state/cotacts/contacts.actions';
import { selectContactsSearch, selectContactsSearchTotal } from 'src/app/state/cotacts/contacts.selectors';
import { leadsRrequired, leadsSearchChanged } from 'src/app/state/leads/leads.actions';
import { selectLeadsSearch, selectLeadsSearchTotal } from 'src/app/state/leads/leads.selector';

const SearchLimit = 5

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  isOpen = false;
  myControl = new FormControl();
  filteredLeads: Lead[] = [];
  totalLeads: number;
  filteredContacts: Contact[] = [];
  totalContacts: number;
  loading: boolean = false
  filter: ListFilter = { limit: SearchLimit, offset: 0, query: "" }
  // can't manage overlay + asyn pipe :(
  fLeads$: Observable<Lead[]> = this.store.select(selectLeadsSearch).pipe(
    tap(leads => {
      this.filteredLeads = leads || []
      this.openCheck()
      this.loading = false
    }))
  fContacts$: Observable<Contact[]> = this.store.select(selectContactsSearch).pipe(
    tap(contacts => {
      this.filteredContacts = contacts || []
      this.openCheck()
      this.loading = false
    }))
  totalLeads$: Observable<number> = this.store.select(selectLeadsSearchTotal).pipe(tap(total => this.totalLeads = total))
  totalContacts$: Observable<number> = this.store.select(selectContactsSearchTotal).pipe(tap(total => this.totalContacts = total))

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.myControl.valueChanges.pipe(
      startWith(''),
      filter(val => val.length > 2),
      tap(val => {
        this.filter = { ...this.filter, query: val }
        this.loading = true
        this.store.dispatch(contactsRequired({ filter: this.filter }))
        this.store.dispatch(leadsRrequired({ filter: this.filter }))
        this.store.dispatch(leadsSearchChanged({ filter: this.filter }))
        this.store.dispatch(contactsSearchChanged({ filter: this.filter }))
      }),
      delay(1000),
      debounceTime(500),
    ).subscribe())
    // no success with async
    this.subscriptions.push(
      forkJoin(
        [this.fLeads$, this.fContacts$, this.totalContacts$, this.totalLeads$]
      ).subscribe()
    )

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  // get leadsPath() {
  //   return `/leads-table?query=${this.filter.query}`
  // }

  // get contactsPath() {
  //   return `contacts?query=${this.filter.query}`
  // }

  get showDivider() {
    return ((this.filteredLeads && this.filteredLeads.length) && (this.filteredContacts && this.filteredContacts.length)) > 0
  }

  get showMoreLeads() {
    return this.filteredLeads ? this.filteredLeads.length > 0 && this.filteredLeads.length < this.totalLeads : false
  }

  get showMoreContacts() {
    return this.filteredContacts ? this.filteredContacts.length > 0 && this.filteredContacts.length < this.totalContacts : false
  }

  openCheck() {
    if (this.filteredLeads.length || this.filteredContacts.length) {
      this.isOpen = true
    } else {
      this.isOpen = false
    }
  }

  close() {
    this.isOpen = false
    this.myControl.patchValue("")
    this.store.dispatch(leadsSearchChanged({ filter: {}}))
    this.store.dispatch(contactsSearchChanged({ filter: {}}))
  }

}
