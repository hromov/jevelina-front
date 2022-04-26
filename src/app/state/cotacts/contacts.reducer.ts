
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { ContactsState } from '../app.state';
import { retrievedContactsList } from './contacts.actions';


export const initialState: ContactsState = { contacts: [], loaded: new Map() };

export const contactsReducer = createReducer(
    initialState,
    on(retrievedContactsList, (state, { contacts, total, filter }) => ({
        contacts:  [...new Set([...state.contacts,...contacts])],
        loaded: state.loaded.set(FilterToString(filter), total),
    }))
);

