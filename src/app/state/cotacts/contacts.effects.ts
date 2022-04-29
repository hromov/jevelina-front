import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, tap } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FilterToString } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { Contact } from 'src/app/shared/model';
import { AppState } from '../app.state';
import { selectLoadedContacts } from './contacts.selectors';

@Injectable()
export class ContactsEffects {
    //allways call backend to get fresh copy  before changes made
    loadContact$ = createEffect(() => this.actions$.pipe(
        ofType('[Contacts Component] Contact Requested' || '[Contact Data] Contact Updated or Added'),
        mergeMap((req: any) => this.contactsService.Get(req.id).pipe(
            map(response => ({type: "[Contacts Service / Effects] Contact Recived", contact: response.body})),
            catchError(() => of({type: '[Contacts Effects / Service] Get contact by ID error'}))
        ))
    ))
    //doesn't check if base has enough to show for search, but pros - it gets total for exact search
    loadContacts$ = createEffect(() => this.actions$.pipe(
        ofType('[Contacts List / Search Component] Contacts Required'),
        mergeMap((action: any) => this.store.select(selectLoadedContacts).pipe(
            map(loaded => ({ filter: action.filter, loaded: loaded }))
        )),
        // tap(console.log),
        filter(res => !res.loaded.has(FilterToString(res.filter))),
        // debounceTime(10),
        mergeMap((res: any) => this.contactsService.List(res.filter)
            .pipe(
                // tap(console.log),
                map(response => ({
                    type: '[Contacts Service / Effects] List Success',
                    contacts: response.body || [],
                    total: Number(response.headers.get("X-Total-Count")),
                    filter: res.filter
                })),
                catchError(() => of({ type: '[Contacts Service] Get List Error' }))
            )
        ),
        shareReplay(),
    )
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private contactsService: ContactsService
    ) { }
}