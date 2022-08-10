import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lead, Transfer } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { transfersRequired } from 'src/app/state/finance/finance.actions';
import { selectProfitByParent } from 'src/app/state/finance/finance.selectors';
// import { TransferDialogComponent } from '../../shared/transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'fin-lead',
  templateUrl: './fin-lead.component.html',
  styleUrls: ['./fin-lead.component.sass']
})
export class FinLeadComponent implements OnInit {
  @Input() lead: Lead
  @Input() short: boolean
  profit$: Observable<Readonly<number>>
    
  constructor(private shared: SharedService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.profit$ = this.store.select(selectProfitByParent(this.lead.ID))
    if (this.short) {
      this.store.dispatch(transfersRequired({ filter: { parent: this.lead.ID } }))
    }
  }

  transfer(from?: boolean, to?: boolean) {
    this.shared.openTransfer(from ? 1 : null, to ? 1 : null, this.lead.ID)
  }

}
