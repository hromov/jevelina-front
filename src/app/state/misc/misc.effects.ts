import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { MiscService } from 'src/app/misc/misc.service';
import { AppState } from '../app.state';

@Injectable()
export class MiscEffects {

    // loadContacts$ = createEffect(() => this.actions$.pipe(
    //     ofType('[Contacts List] Paginator Changed required list'),
    //     mergeMap((action: any) => this.store.select(selectLoadedContacts).pipe(
    //         map(loaded => ({ current: action.current, loaded: loaded }))
    //     )),
    //     filter(res => res.loaded.indexOf(FilterToString(res.current)) == -1),
    //     mergeMap((res: any) => this.contactsService.List(res.current)
    //         .pipe(
    //             map(response => ({
    //                 type: '[Contacts Service] List Success',
    //                 contacts: response.body || [],
    //                 current: res.current
    //             })),
    //             catchError(() => of({ type: '[Contacts Service] Get List Error' }))
    //         )
    //     ),
    //     shareReplay(),
    // )
    // );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private miscService: MiscService
    ) { }
}