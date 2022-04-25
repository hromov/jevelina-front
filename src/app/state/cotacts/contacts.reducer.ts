
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { ContactsState } from '../app.state';
import { changeContactsFilter, retrievedContactsList } from './contacts.actions';


export const initialState: ContactsState = { contacts: [], total: 0, loaded: [], current: {} };

export const contactsReducer = createReducer(
    initialState,
    on(retrievedContactsList, (state, { contacts, total, current }) => ({
        contacts: state.contacts.concat(contacts),
        total: total ? total : state.total,
        loaded: state.loaded.concat(FilterToString(current)),
        current: current,
    })),
    on(changeContactsFilter, (state, { current }) => ({
        ...state,
        current: current
    }))
);

