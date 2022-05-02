import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor( private actions$: Actions, private store: Store<AppState>) {
    console.group("router")
    console.log("created")
    this.actions$.pipe(tap(console.log),ofType("ROUTER_REQUEST")).subscribe(console.log)
  }
}
