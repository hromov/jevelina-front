import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, shareReplay, filter, tap } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService, FilterToString } from 'src/app/api.service';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { Contact } from 'src/app/shared/model';
import { AppState } from '../app.state';
import { isTaskLoaded } from './tasks.selectors';

@Injectable()
export class TasksEffects {
    //allways call backend to get fresh copy  before changes made
    // loadContact$ = createEffect(() => this.actions$.pipe(
    //     ofType('[Contacts Component] Contact Requested'),
    //     mergeMap((req: any) => this.contactsService.Get(req.id).pipe(
    //         map(response => ({type: "[Contacts Service / Effects] Contact Recived", contact: response.body})),
    //         catchError(() => of({type: '[Contacts Effects / Service] Get contact by ID error'}))
    //     ))
    // ))
    //doesn't check if base has enough to show for search, but pros - it gets total for exact search
    loadTasks$ = createEffect(() => this.actions$.pipe(
        ofType('[Lead or Contact Data Page] Tasks Required'),
        mergeMap((action: any) => this.store.select(isTaskLoaded(action.parentID)).pipe(
            map(loaded => ({ parentID: action.parentID, loaded: loaded }))
        )),
        // tap(console.log),
        filter(res => !res.loaded),
        // tap(console.log),
        // debounceTime(10),
        mergeMap((res: any) => this.apiService.TasksFor(res.parentID)
            .pipe(
                // tap(console.log),
                map(tasks => ({
                    type: '[Lead or Contact Data Page] Tasks Loaded',
                    tasks: tasks || [],
                    parentID: res.parentID,
                })),
                catchError(() => of({ type: '[Api Service] Get TasksFor Error' }))
            )
        ),
        shareReplay(),
    )
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private apiService: ApiService
    ) { }
}