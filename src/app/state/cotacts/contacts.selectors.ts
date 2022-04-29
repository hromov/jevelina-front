import { createSelector } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { Contact, ListFilter } from 'src/app/shared/model';
import { AppState, ContactsState } from '../app.state';

export const selectContacts = (state: AppState) => state.contacts;

export const selectAllContacts = createSelector(
    selectContacts,
    (state: ContactsState) => state.contacts.slice(0)
)

export const selectContact = (id: number) => createSelector(
    selectContacts,
    (state: ContactsState) => {
        const index = state.contacts.map(c => c.ID).indexOf(Number(id))
        return (index != -1) ? state.contacts[index] : null
    }
)

export const selectFilteredContacts = (filter: ListFilter) => createSelector(
    selectContacts,
    (state: ContactsState) => _filter(state.contacts.slice(0), filter)
)

export const selectCurrentPageFilter = createSelector(
    selectContacts,
    (state: ContactsState) => state.currentPage
)

export const selectContactsTotal = createSelector(
    selectContacts,
    selectCurrentPageFilter,
    (state: ContactsState, filter: ListFilter) => state.loaded.has(FilterToString(filter)) ? state.loaded.get(FilterToString(filter)) : 0
)

export const selectCurrentPage = createSelector(
    selectContacts,
    selectCurrentPageFilter,
    (state: ContactsState, filter: ListFilter) => _filter(state.contacts.slice(0), filter)
)

export const selectContactsCurrentTotal = createSelector(
    selectContacts,
    selectCurrentPageFilter,
    (state: ContactsState, filter: ListFilter) => state.loaded.get(FilterToString(filter))
)

export const selectContactsSearchFilter = createSelector(
    selectContacts,
    (state: ContactsState) => state.currentSearch
)

export const selectContactsSearch = createSelector(
    selectContacts,
    selectContactsSearchFilter,
    (state: ContactsState, filter: ListFilter) => _filter(state.contacts.slice(0), filter)
)

export const selectContactsSearchTotal = createSelector(
    selectContacts,
    selectContactsSearchFilter,
    (state: ContactsState, filter: ListFilter) => state.loaded.get(FilterToString(filter))
)

export const selectLoadedContacts = createSelector(
    selectContacts,
    (state: ContactsState) => state.loaded
)

function _filter(contacts: Contact[], filter: ListFilter): Contact[] {
    if(Object.keys(filter).length === 0) {
        return []
    }
    const filtered = contacts.filter(c => _valid(c, filter))
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
        return filtered.slice(filter.offset, filtered.length)
    }
    // console.log("normal return with all filter")
    return filtered.slice(filter.offset, filter.offset + filter.limit)
}

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