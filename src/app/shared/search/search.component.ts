import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concatMap, debounce, debounceTime, delay, exhaustMap, filter, map, Observable, startWith, Subscription, tap } from 'rxjs';
import { FilterToString } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { LeadsService } from 'src/app/leads/leads.service';
import { Contact, Lead, ListFilter } from 'src/app/models/model';

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
  filteredLeads: Lead[];
  filteredContacts: Contact[];
  loading: boolean = false
  filter: ListFilter = {limit: SearchLimit, offset: 0, query: ""}
  totalLeads: number = 0
  totalContacts: number = 0
  
  constructor(
    private leadsService: LeadsService,
    private contactsService: ContactsService,
  ) { }

  ngOnInit(): void {
    //was used as async at first
    // Search is not cached. Don't know how 
    this.subscriptions.push(this.myControl.valueChanges.pipe(
      startWith(''),
      filter(val => val.length > 2),
      tap(() => this.loading = true),
      delay(1000),
      debounceTime(500),
      exhaustMap(val => {
        this.filter.query = val
        return this.contactsService.List(this.filter).pipe(
          map(resp => {
            this.isOpen = true
            let contacts = resp.body
            this.totalContacts = Number(resp.headers.get("X-Total-Count"))
            return contacts
          }),
          tap(() => this.loading = false)
        )
      })
    ).subscribe(contacts => this.filteredContacts = contacts));

    this.subscriptions.push(this.myControl.valueChanges.pipe(
      startWith(''),
      filter(val => val.length > 2),
      tap(() => this.loading = true),
      delay(1000),
      debounceTime(500),
      exhaustMap(val => {
        this.filter.query = val
        return this.leadsService.List(this.filter).pipe(
          map(resp => {
            this.isOpen = true
            let leads = resp.body
            this.totalLeads = Number(resp.headers.get("X-Total-Count"))
            return leads
          }),
          tap(() => this.loading = false)
        )
      })
    ).subscribe(leads => this.filteredLeads = leads));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())   
  }

  get leadsPath() {
    return `/leads-table?${FilterToString(this.filter)}`
  }

  get contactsPath() {
    return `/contacts?${FilterToString(this.filter)}`
  }

  get showDivider() {
    return ((this.filteredLeads && this.filteredLeads.length) && (this.filteredContacts && this.filteredContacts.length)) > 0
  }

  get showMoreLeads() {
    return this.filteredLeads ? this.filteredLeads.length < this.totalLeads : false
  }

  get showMoreContacts() {
    return this.filteredContacts ? this.filteredContacts.length < this.totalContacts : false
  }

  close() {
    this.isOpen = false
  }

}
