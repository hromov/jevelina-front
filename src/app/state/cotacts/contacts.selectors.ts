import { createSelector } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { Contact, ListFilter } from 'src/app/models/model';
import { AppState, ContactsState } from '../app.state';
 
export const selectContacts = (state: AppState) => state.contacts;

export const selectAllContacts = createSelector(
    selectContacts,
    (state: ContactsState) => state.contacts.slice(0)
)

export const selectContactsTotal = (request: string) => createSelector(
    selectContacts,
    (state: ContactsState) => state.loaded.has(request) ? state.loaded.get(request) : 0
)

export const selectFilteredContacts = (filter: ListFilter) => createSelector(
    selectContacts,
    (state: ContactsState) => {
        const filtered = state.contacts.filter(c => _valid(c, filter))
        // console.group(FilterToString(filter))
        // console.log(filter, filtered)
        if (!filtered || filter.limit === undefined || filter.offset === undefined) {
            // console.log("fast return", !filtered)
            return filtered
        }
        if (!filtered || filter.offset > filtered.length) {
            // console.log("blank return")
            return []
        }
        if (filtered.length < (filter.offset + filter.limit)) {
            // console.log("trunc return")
            return filtered.slice(filter.offset,filtered.length)
        }
        // console.log("normal return with all filter")
        return filtered.slice(filter.offset, filter.offset+filter.limit)
    }
)

export const selectLoadedContacts = createSelector(
    selectContacts,
    (state : ContactsState) => state.loaded
)

//can't fully check query :-/ I have to reproduce search search algo here then
function _valid(c: Contact, filter: ListFilter): boolean {
    if (filter.query && !_queryCheck(c, filter.query)) {
        return false
    }
    return true
}

function _queryCheck(c: Contact, query: string): boolean {
    const q = query.toLowerCase()
    return c.Name.toLowerCase().includes(q) || c.Phone.toLowerCase().includes(q) || c.SecondPhone.toLowerCase().includes(q) || c.SecondName.toLowerCase().includes(q)
}