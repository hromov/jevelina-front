import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, debounceTime, share } from 'rxjs';
import { map, mergeMap, catchError, concatMap, exhaustMap } from 'rxjs/operators';
import { FilterToString } from 'src/app/api.service';
import { LeadsService } from 'src/app/leads/leads.service';
import { AppState } from '../app.state';
import { selectLoadedLeads } from './leads.selector';

@Injectable()
export class LeadsEffects {

    loadLeads$ = createEffect(() => this.actions$.pipe(
        ofType('[Leads List] Leads Required'),
        mergeMap((action: any) => this.store.select(selectLoadedLeads).pipe(
            map(loaded => ({ filter: action.filter, loaded: loaded }))
        )),
        filter(res => res.loaded.indexOf(FilterToString(res.filter)) == -1),
        debounceTime(10),
        mergeMap((res: any) => this.leadsService.List(res.filter)
            .pipe(
                map(response => ({
                    type: '[Leads Service] List Success',
                    leads: response.body || [],
                    filter: res.filter
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