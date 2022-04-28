import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  newDialog(): MatDialogConfig<any> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = "400px"
    return dialogConfig
  }
  
}
