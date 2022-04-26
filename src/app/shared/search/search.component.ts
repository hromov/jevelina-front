import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concatMap, debounce, debounceTime, delay, exhaustMap, filter, map, Observable, startWith, tap } from 'rxjs';
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
export class SearchComponent implements OnInit {
  // isOpen = false;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  filteredLeads: Observable<Lead[]>;
  filteredContacts: Observable<Contact[]>;
  loading: boolean = false
  filter: ListFilter = {limit: SearchLimit, offset: 0, query: ""}
  searchContacts: string = ""
  searchLeads: string = ""
  totalLeads: number = 0
  totalContacts: number = 0
  // showMore: boolean = false
  // showMoreContacts: boolean = false
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];


  
  constructor(
    private leadsService: LeadsService,
    private contactsService: ContactsService,
  ) { }

  ngOnInit(): void {
    this.filteredContacts = this.myControl.valueChanges.pipe(
      startWith(''),
      filter(val => val.length > 2),
      tap(() => this.loading = true),
      delay(1000),
      debounceTime(500),
      exhaustMap(val => {
        this.filter.query = val
        return this.contactsService.List(this.filter).pipe(
          map(resp => {
            let contacts = resp.body
            this.totalContacts = Number(resp.headers.get("X-Total-Count"))
            if (this.totalContacts > SearchLimit) {
              //change to real
              this.searchContacts = `/contacts?${FilterToString(this.filter)}`
              // this.showMoreContacts = true
              contacts = contacts.slice(0,SearchLimit-1)
            } else {
              // this.showMoreContacts = false
              this.searchContacts = ""
            }
            return contacts
          }),
          tap(() => this.loading = false)
        )
      })
      // map(value => this._filter(value)),
    );
    this.filteredLeads = this.myControl.valueChanges.pipe(
      startWith(''),
      filter(val => val.length > 2),
      tap(() => this.loading = true),
      delay(1000),
      debounceTime(500),
      exhaustMap(val => {
        this.filter.query = val
        return this.leadsService.List(this.filter).pipe(
          map(resp => {
            let leads = resp.body
            this.totalLeads = Number(resp.headers.get("X-Total-Count"))
            if (this.totalLeads > SearchLimit) {
              this.searchLeads = `/leads-table?${FilterToString(this.filter)}`
              // this.showMore = true
              leads = leads.slice(0,SearchLimit-1)
            } else {
              // this.showMore = false
              this.searchLeads = ""
            }
            return leads
          }),
          tap(() => this.loading = false)
        )
      })
      // map(value => this._filter(value)),
    );
  }

}
