import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ListFilter } from '../contacts/contacts.model';
import { ContactsService, FilterToString } from '../contacts/contacts.service';

@Injectable()
export class ContactsEffects {

    loadContacts$ = createEffect(() => this.actions$.pipe(
        ofType('[Contacts List] Paginator Changed required list'),
        mergeMap((filter: any) => this.contactsService.List(filter.current)
            .pipe(
                map(response => ({
                    type: '[Contacts Service] List Success',
                    contacts: response.body || [],
                    current: filter.current
                })),
                catchError(() => of({ type: '[Contacts Service] List Error' }))
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private contactsService: ContactsService
    ) { }
}