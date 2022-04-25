
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from '../contacts/contacts.service';
import { ContactsState } from './app.state';
import { changeFilter, retrievedContactList } from './contacts.actions';


export const initialState: ContactsState = {contacts:[],total:0, loaded: [], current: {}};

export const contactsReducer = createReducer(
    initialState,
    on(retrievedContactList, (state, { contacts, total, current}) => ({
        contacts : state.contacts.concat(contacts),
        total: total,
        loaded: state.loaded.concat(FilterToString(current)),
        current: current,
    })),
    on(changeFilter, (state, { current}) => ({
        ...state,
        current: current
    }))
);

