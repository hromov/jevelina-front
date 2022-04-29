import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { AppState } from 'src/app/state/app.state';
import { retrievedProducts } from 'src/app/state/misc/misc.actions';
import { MiscService } from '../misc.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: '../templates/item-list.html',
  styleUrls: ['../templates/item-list.sass']
})
export class ProductsComponent implements OnInit {
  constructor(private api: ApiService, private shared: SharedService, private dialog: MatDialog, private store: Store<AppState>) { }
  items: Product[] = []

  ngOnInit(): void {
    this.api.Products().pipe(first()).subscribe(items => {
      this.items = items
      this.store.dispatch(retrievedProducts({ products: items || [] }))
    })
  }

  editItem(item?: Product) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.api.Products().pipe(first())
        .subscribe(items => {
          this.items = items
          this.store.dispatch(retrievedProducts({ products: items || [] }))
        })
      )
  }

}
