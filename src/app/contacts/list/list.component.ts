import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../../models/model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { changeFilter } from 'src/app/state/contacts.actions';

var pageSize = 25

@Component({
  selector: 'contacts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements AfterViewInit {
  @Input() contacts: ReadonlyArray<Contact> = [];
  @Input() total: Readonly<number> = 0;
  displayedColumns: string[] = ['name', 'phone', 'responsible', 'city', 'source', 'created', 'updated'];

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(private store: Store<AppState>) { }

  pageChanged(e: PageEvent) {
    const offset = e.pageIndex * pageSize
    this.store.dispatch(changeFilter({current: {limit: pageSize, offset: offset}}))
  }

}
