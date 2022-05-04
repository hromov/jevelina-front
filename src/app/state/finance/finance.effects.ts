import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, debounceTime, share, tap } from 'rxjs';
import { map, mergeMap, catchError, concatMap, exhaustMap } from 'rxjs/operators';
import { FinanceService } from "src/app/finance/finance.service";
import { AppState } from '../app.state';
import { selectLoadedLeads } from '../leads/leads.selector';
import { selectWallets } from './finance.selectors';

@Injectable()
export class FinanceEffects {
    //allways call backend to get fresh copy  before changes made
    loadWallets$ = createEffect(() => this.actions$.pipe(
        ofType('[Components] Wallets Required'),
        concatMap(() => this.store.select(selectWallets)),
        filter(wallets => !!wallets),
        mergeMap(() => this.fs.Wallets().pipe(
            map(wallets => ({ type: "[Finance Service] Wallets Loaded", wallets: wallets })),
            catchError(() => of({ type: '[Finance Service] Cant get wallets' }))
        ))
    ))

    



    constructor(private actions$: Actions, private fs: FinanceService, private store: Store<AppState>) {

    }
}