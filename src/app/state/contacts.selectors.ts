import { createSelector } from '@ngrx/store';
import { AppState, ContactsState } from './app.state';
 
export const selectContacts = (state: AppState) => state.contacts;

export const selectAll = createSelector(
    selectContacts,
    (state: ContactsState) => state.contacts
)

export const selectTotal = createSelector(
    selectContacts,
    (state: ContactsState) => state.total
)

export const selectCurrent = createSelector(
    selectContacts,
    (state: ContactsState) => {
        return state.contacts.slice(state.current.offset, state.current.offset+state.current.limit)
    }
)
