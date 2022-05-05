import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lead, Transfer } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { selectProfitByParent } from 'src/app/state/finance/finance.selectors';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'fin-lead',
  templateUrl: './fin-lead.component.html',
  styleUrls: ['./fin-lead.component.sass']
})
export class FinLeadComponent implements OnInit {
  @Input() lead: Lead
  profit$: Observable<Readonly<number>>
    
  constructor(private shared: SharedService, private dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.profit$ = this.store.select(selectProfitByParent(this.lead.ID))
  }

  transfer(from?: boolean, to?: boolean) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = { From: from ? 1 : null, To: to ? 1 : null, ParentID: this.lead.ID }
    this.dialog.open(TransferDialogComponent, dialogConfig)
  }

}
