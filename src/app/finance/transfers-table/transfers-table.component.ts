import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transfer } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { selectCurrentTransfersTotal } from 'src/app/state/finance/finance.selectors';

@Component({
  selector: 'app-transfers-table',
  templateUrl: './transfers-table.component.html',
  styleUrls: ['./transfers-table.component.sass']
})
export class TransfersTableComponent implements OnInit {
  @Input() transfers: ReadonlyArray<Transfer>
  @Output() pageChangedEvent = new EventEmitter<PageEvent>()
  displayedColumns: string[] = ['created', 'wallet', 'category', 'amount'];
  total$: Observable<number> = this.store.select(selectCurrentTransfersTotal)
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  pageChanged(e: PageEvent) {
    this.pageChangedEvent.emit(e)
  }

}
