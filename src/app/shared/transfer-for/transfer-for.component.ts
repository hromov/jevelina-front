import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Transfer } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { selectProfitByParent, selectTransfersByParent } from 'src/app/state/finance/finance.selectors';

@Component({
  selector: 'transfer-for',
  templateUrl: './transfer-for.component.html',
  styleUrls: ['./transfer-for.component.sass']
})
export class TransferForComponent implements OnInit {
  @Input() parentID: number
  transfers$: Observable<ReadonlyArray<Transfer>>
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.transfers$ = this.store.select(selectTransfersByParent(this.parentID))
  }

}
