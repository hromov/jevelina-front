import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Product } from 'src/app/shared/model';
import { SharedService } from 'src/app/shared/shared.service';
import { MiscService } from '../misc.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: '../templates/item-list.html',
  styleUrls: ['../templates/item-list.sass']
})
export class ProductsComponent implements OnInit {
  constructor(private api: ApiService, private shared: SharedService, private dialog: MatDialog) { }
  items: Product[] = []
  
  ngOnInit(): void {
    this.api.Products().pipe(first()).subscribe(items => this.items = items)
  }

  editItem(item?: Product) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.api.Products().pipe(first()).subscribe(items => this.items = items))
  }

}
