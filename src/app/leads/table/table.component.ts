import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Lead, ListFilter } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { selectCurrentPageFilter } from 'src/app/state/cotacts/contacts.selectors';
import { leadsPageChanged, leadsRequired, leadsSearchChanged } from 'src/app/state/leads/leads.actions';
import { selectCurrentPage, selectLeadsCurrentTotal, selectLeadsSearch, selectLeadsSearchTotal } from 'src/app/state/leads/leads.selector';

@Component({
  selector: 'leads-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class LeadsTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'step', 'contact', 'responsible', 'city', 'source', 'created', 'updated'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filter: ListFilter = {limit: 25, offset: 0, query: ""}
  leads$: Observable<Lead[]> = this.store.select(selectCurrentPage)
  total$: Observable<number>  = this.store.select(selectLeadsCurrentTotal) //this.store.select(selectContactsTotal(FilterToString(this.filter)));
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.filter = {...this.filter, query: params["query"] || "", offset: 0}
        console.log(this.filter)
        this.store.dispatch(leadsRequired({filter: this.filter}))
        this.store.dispatch(leadsPageChanged({filter: this.filter}))
        this.paginator && this.paginator.firstPage()
      }
    );
    
  }
  pageChanged(e: PageEvent) {
    this.filter = {...this.filter, offset: e.pageIndex * this.filter.limit}
    this.store.dispatch(leadsRequired({filter: this.filter}))
    this.store.dispatch(leadsPageChanged({filter: this.filter}))
  }

}
