import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, debounceTime, share, tap } from 'rxjs';
import { map, mergeMap, catchError, concatMap, exhaustMap } from 'rxjs/operators';
import { FilterToString } from 'src/app/api.service';
import { LeadsService } from 'src/app/leads/leads.service';
import { AppState } from '../app.state';
import { selectLoadedLeads } from './leads.selector';

@Injectable()
export class LeadsEffects {

    //allways call backend to get fresh copy  before changes made
    loadLead$ = createEffect(() => this.actions$.pipe(
        ofType('[Leads Component] Leads Requested'),
        mergeMap((req: any) => this.leadsService.Get(req.id).pipe(
            map(response => ({type: "[Leads Service / Effects] Lead Recived", lead: response.body})),
            catchError(() => of({type: '[Leads Effects / Service] Get lead by ID error'}))
        ))
    ))
    
    //doesn't check if base has enough to show for search, but pros - it gets total for exact search
    loadLeads$ = createEffect(() => this.actions$.pipe(
        ofType('[Leads List] Leads Required'),
        mergeMap((action: any) => this.store.select(selectLoadedLeads).pipe(
            map(loaded => ({ filter: action.filter, loaded: loaded }))
        )),
        filter(res => !res.loaded.has(FilterToString(res.filter))),
        // tap(() => console.log("not filtered")),
        // debounceTime(10),
        mergeMap((res: any) => this.leadsService.List(res.filter)
            .pipe(
                map(response => {
                    // console.log(response)
                    return ({
                        type: '[Leads Service] List Success',
                        leads: response.body || [],
                        total: Number(response.headers.get("X-Total-Count")),
                        filter: res.filter
                    })
                }),
                catchError(() => of({ type: '[Leads Service] Get List Error' }))
            )
        ),
    )
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private leadsService: LeadsService
    ) { }
}