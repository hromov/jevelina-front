
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { ContactsState } from '../app.state';
import { contactRecieved, contactsPageChanged, contactsSearchChanged, retrievedContactsList } from './contacts.actions';


export const initialState: ContactsState = { contacts: [], loaded: new Map(), currentPage: {}, currentSearch: {}, searchTotal: 0 };

export const contactsReducer = createReducer(
    initialState,
    on(retrievedContactsList, (state, { contacts, total, filter }) => {
        // console.log(contacts, total, filter)
        let unique = new Map()
        state.contacts.forEach(l => unique.set(l.ID, l))
        contacts.forEach(l => unique.set(l.ID, l))
        //server gives 0 total if offset
        const realTotal = filter.offset ? state.searchTotal : total
        return ({
            ...state,
            contacts: [...unique.values()],
            loaded: state.loaded.set(FilterToString(filter), realTotal),
            searchTotal: realTotal,
        })
    }),
    on(contactsPageChanged, (state, { filter }) => ({
        ...state,
        currentPage: filter,
    })),
    on(contactsSearchChanged, (state, { filter }) => ({
        ...state,
        currentSearch: filter,
    })),
    on(contactRecieved, (state, { contact }) => {
        // console.log(contact)
        const index = state.contacts.map(c => c.ID).indexOf(contact.ID)
        let newContacts = state.contacts.slice(0)
        if (index == -1) {
            newContacts.push(contact)
        } else {
            newContacts[index] = contact
        }
        return ({
            ...state,
            contacts: newContacts
        })
    })
);

