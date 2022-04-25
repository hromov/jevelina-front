import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FilterToString } from 'src/app/api.service';
import { LeadsService } from 'src/app/leads/leads.service';
import { AppState } from '../app.state';
import { selectLoaded } from './leads.selector';

@Injectable()
export class LeadsEffects {

    loadLeads$ = createEffect(() => this.actions$.pipe(
        ofType('[Leads List] Paginator Changed required list'),
        mergeMap((action: any) => this.store.select(selectLoaded).pipe(
            map(loaded => ({ current: action.current, loaded: loaded }))
        )),
        filter(res => res.loaded.indexOf(FilterToString(res.current)) == -1),
        mergeMap((res: any) => this.leadsService.List(res.current)
            .pipe(
                map(response => ({
                    type: '[Leads Service] List Success',
                    leads: response.body || [],
                    current: res.current
                })),
                catchError(() => of({ type: '[Leads Service] Get List Error' }))
            )
        ),
        shareReplay(),
    )
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private leadsService: LeadsService
    ) { }
}