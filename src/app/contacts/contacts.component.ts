import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Contact, ListFilter } from '../models/model';
import { selectContactsCurrentTotal, selectContactsSearchTotal, selectContactsTotal, selectCurrentPage } from '../state/cotacts/contacts.selectors';
import { contactsPageChanged, contactsRequired } from '../state/cotacts/contacts.actions';
import { Observable } from 'rxjs';
import { FilterToString } from '../api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filter: ListFilter = {limit: 25, offset: 0, query: ""}
  contacts$: Observable<Contact[]> = this.store.select(selectCurrentPage)
  total$: Observable<number>  = this.store.select(selectContactsCurrentTotal) //this.store.select(selectContactsTotal(FilterToString(this.filter)));
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.filter = {...this.filter, query: params["query"], offset: 0}
        this.store.dispatch(contactsRequired({filter: this.filter}))
        this.store.dispatch(contactsPageChanged({filter: this.filter}))
        this.paginator && this.paginator.firstPage()
      }
    );
    
  }
  pageChanged(e: PageEvent) {
    this.filter = {...this.filter, offset: e.pageIndex * this.filter.limit}
    this.store.dispatch(contactsRequired({filter: this.filter}))
    this.store.dispatch(contactsPageChanged({filter: this.filter}))
  }

  

}
