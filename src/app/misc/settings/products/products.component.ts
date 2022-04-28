import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, first } from 'rxjs';
import { Product } from 'src/app/models/model';
import { SharedService } from 'src/app/shared/shared.service';
import { MiscService } from '../../misc.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  constructor(private misc: MiscService, private shared: SharedService, private dialog: MatDialog) { }
  items: Product[] = []
  
  ngOnInit(): void {
    this.misc.Products().pipe(first()).subscribe(items => this.items = items)
  }

  editItem(item?: Product) {
    const dialogConfig = this.shared.newDialog()
    dialogConfig.data = item || {}
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig)
    //if returned value - everything ok, have to update
    dialogRef.afterClosed().pipe(filter(val => val!!))
      .subscribe(() => this.misc.Products().pipe(first()).subscribe(items => this.items = items))
  }

}
