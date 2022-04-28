import { AfterViewInit, Component, Input } from '@angular/core';
import { Contact } from '../../shared/model';

@Component({
  selector: 'contacts-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ContactsListComponent implements AfterViewInit {
  @Input() contacts: ReadonlyArray<Contact> = [];
  displayedColumns: string[] = ['name', 'phone', 'responsible', 'city', 'source', 'created', 'updated'];

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  constructor() { }



}
