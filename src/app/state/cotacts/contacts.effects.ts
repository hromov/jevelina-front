import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, debounceTime } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FilterToString } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { AppState } from '../app.state';
import { selectLoadedContacts } from './contacts.selectors';

@Injectable()
export class ContactsEffects {
    //doesn't check if base has enough to show for search, but pros - it gets total for exact search
    loadContacts$ = createEffect(() => this.actions$.pipe(
        ofType('[Contacts List / Search Component] contactsRequired'),
        mergeMap((action: any) => this.store.select(selectLoadedContacts).pipe(
            map(loaded => ({ filter: action.filter, loaded: loaded }))
        )),
        filter(res => !res.loaded.has(FilterToString(res.filter))),
        // debounceTime(10),
        mergeMap((res: any) => this.contactsService.List(res.filter)
            .pipe(
                map(response => ({
                    type: '[Contacts Service] List Success',
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