
import { createReducer, on } from '@ngrx/store';
import { ContactsState } from './app.state';
import { retrievedContactList } from './contacts.actions';


export const initialState: ContactsState = {contacts:[],total:0};

export const contactsReducer = createReducer(
    initialState,
    on(retrievedContactList, (state, { contacts, total}) => ({ contacts : state.contacts.concat(contacts), total: total}) )
);

