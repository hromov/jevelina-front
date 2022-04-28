import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first, tap } from 'rxjs';
import { Source } from 'src/app/models/model';
import { SharedService } from 'src/app/shared/shared.service';
import { MiscService } from '../../misc.service';
import { SourceDialogComponent } from './source-dialog/source-dialog.component';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.sass']
})
export class SourcesComponent implements OnInit {
  constructor(private misc: MiscService, private shared: SharedService, private dialog: MatDialog) { }
  sources: Source[] = []
  
  ngOnInit(): void {
    this.misc.Sources().pipe(first()).subscribe(sources => this.sources = sources)
  }

  editItem(item?: Source) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(SourceDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.misc.Sources().pipe(first()).subscribe(s => this.sources = s))
  }

  // newItem() {
  //   const dialogConfig = this.shared.newDialog()
  //   dialogConfig.data = {}
  //   const dialogRef = this.dialog.open(SourceDialogComponent, dialogConfig)
  //   dialogRef.afterClosed().pipe(filter(val => val!!))
  //     .subscribe(() => this.misc.Sources().pipe(first()).subscribe(s => this.sources = s))
  // }
}
