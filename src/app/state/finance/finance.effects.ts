import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, debounceTime, share, tap } from 'rxjs';
import { map, mergeMap, catchError, concatMap, exhaustMap } from 'rxjs/operators';
import { FinanceService } from "src/app/finance/finance.service";
import { ListFilter } from 'src/app/shared/model';
import { AppState } from '../app.state';
import { selectLoadedLeads } from '../leads/leads.selector';
import { areTransfersLoaded, selectWallets } from './finance.selectors';

@Injectable()
export class FinanceEffects {
    //allways call backend to get fresh copy  before changes made
    loadWallets$ = createEffect(() => this.actions$.pipe(
        ofType('[Components] Wallets Required'),
        // concatMap(() => this.store.select(selectWallets)),
        // filter(wallets => !!wallets),
        mergeMap(() => this.fs.Wallets().pipe(
            map(wallets => ({ type: "[Finance Service] Wallets Loaded", wallets: wallets })),
            catchError(() => of({ type: '[Finance Service] Cant get wallets' }))
        ))
    ))

    loadTansfers$ = createEffect(() => this.actions$.pipe(
        ofType('[Finance Service] Transfers Required'),
        mergeMap((action: any) => this.store.select(areTransfersLoaded(action.filter)).pipe(
            map(loaded => ({ filter: action.filter, loaded: loaded }))
        )),
        filter(res => !res.loaded),
        mergeMap((res: any) => this.fs.Transfers(res.filter)
            .pipe(
                map(response => {
                    // console.log(response)
                    return ({
                        type: '[Finance Service] Transfers Success',
                        transfers: response.body || [],
                        total: Number(response.headers.get("X-Total-Count")),
                        filter: res.filter
                    })
                }),
                catchError(() => of({ type: '[Finance Service] Transfers Error' }))
            )
        ),
    )
    );

    



    constructor(private actions$: Actions, private fs: FinanceService, private store: Store<AppState>) {

    }
}