
import { createReducer, on } from '@ngrx/store';

import { retrievedContactList, setTotal } from './contacts.actions';
import { Contact } from '../contacts/contacts.model';

export const initialState: ReadonlyArray<Contact> = [];
export const totalState: Readonly<number> = 0;

export const contactsReducer = createReducer(
    initialState,
    on(retrievedContactList, (state, { contacts }) => contacts),
);

export const totalReducer = createReducer(
    totalState,
    on(setTotal, (state, { total }) => total)
)