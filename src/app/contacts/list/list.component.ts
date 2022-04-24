import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../contacts.model';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'contacts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements AfterViewInit {
  @Input() contacts: ReadonlyArray<Contact> = [];
  @Input() total: Readonly<number> = 0;
  displayedColumns: string[] = ['name', 'phone', 'responsible', 'city', 'source', 'created', 'updated'];

  // dataSource = new MatTableDataSource<Contact>(this.contacts.slice(0));

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor() { }

}
