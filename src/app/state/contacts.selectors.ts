import { createSelector } from '@ngrx/store';
import { AppState, ContactsState } from './app.state';
 
export const selectContactsState = (state: AppState) => state.contacts;

export const selectContacts = createSelector(
    selectContactsState,
    (state: ContactsState) => state.contacts
)

export const selectTotal = createSelector(
    selectContactsState,
    (state: ContactsState) => state.total
)
