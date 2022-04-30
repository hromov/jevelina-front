import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, tap } from 'rxjs';
import { Lead, ListFilter } from 'src/app/shared/model';
import { ScrollService } from 'src/app/shared/scroll.service';
import { AppState } from 'src/app/state/app.state';
import { leadsRequired } from 'src/app/state/leads/leads.actions';
import { selectedUser, selectFilteredLeads, selectLeads } from 'src/app/state/leads/leads.selector';

@Component({
  selector: 'leads-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class LeadsListComponent implements OnInit, OnChanges {
  @Input() step: number = null
  @Input() userID: number = null
  leads$: Observable<Lead[]>
  limit = 10
  offset = 0
  downloaded = 0
  canDownload = true
  constructor(
    private store: Store<AppState>,
    private scrollService: ScrollService,
  ) { }

  ngOnChanges(): void {
    const filter: ListFilter = { limit: this.limit, offset: this.offset, step: this.step, responsible: this.userID }
    this.store.dispatch(leadsRequired({ filter: filter }))
    this.leads$ = this.store.select(selectFilteredLeads({ step: this.step, responsible: this.userID })).pipe(tap(leads => this.downloaded = leads && leads.length))
  }
  ngOnInit(): void {
    this.scrollService.percentage.pipe(distinctUntilChanged()).subscribe(p => {

      if (p < 90 && !this.canDownload) {
        this.canDownload = true
      }
      if (p > 90 && this.canDownload && this.downloaded == (this.limit + this.offset)) {
        // console.log(p, this.downloaded, `step = ${this.step}`)
        // to prevent multiple requests
        this.canDownload = false
        this.offset += this.limit
        this.store.dispatch(leadsRequired({ filter: { limit: this.limit, offset: this.offset, step: this.step, responsible: this.userID } }))

      }
    })
  }

  // pageChanged(e: PageEvent) {
  //   const offset = e.pageIndex * pageSize
  //   this.store.dispatch(changeFilter({current: {limit: pageSize, offset: offset}}))
  // }

}
