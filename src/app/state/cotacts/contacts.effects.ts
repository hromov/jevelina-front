import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FilterToString } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { AppState } from '../app.state';
import { selectLoadedContacts } from './contacts.selectors';

@Injectable()
export class ContactsEffects {

    loadContacts$ = createEffect(() => this.actions$.pipe(
        ofType('[Contacts List] Paginator Changed required list'),
        mergeMap((action: any) => this.store.select(selectLoadedContacts).pipe(
            map(loaded => ({ current: action.current, loaded: loaded }))
        )),
        filter(res => res.loaded.indexOf(FilterToString(res.current)) == -1),
        mergeMap((res: any) => this.contactsService.List(res.current)
            .pipe(
                map(response => ({
                    type: '[Contacts Service] List Success',
                    contacts: response.body || [],
                    current: res.current
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