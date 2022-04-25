import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Lead } from 'src/app/models/model';
import { AppState } from 'src/app/state/app.state';
import { selectLeadsByStep } from 'src/app/state/leads/leads.selector';

@Component({
  selector: 'leads-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class LeadsListComponent implements OnInit {
  @Input() step: number = null;
  leads$: Observable<Lead[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.leads$ = this.store.select(selectLeadsByStep(this.step)).pipe(tap(console.log))
  }

  // pageChanged(e: PageEvent) {
  //   const offset = e.pageIndex * pageSize
  //   this.store.dispatch(changeFilter({current: {limit: pageSize, offset: offset}}))
  // }

}
