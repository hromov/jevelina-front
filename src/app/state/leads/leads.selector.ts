import { createSelector } from '@ngrx/store';
import { isEmpty, of } from 'rxjs';
import { FilterToString } from 'src/app/api.service';
import { Lead, ListFilter } from 'src/app/shared/model';
import { AppState, LeadsState } from '../app.state';

export const selectLeads = (state: AppState) => state.leads;

export const selectAllLeads = createSelector(
  selectLeads,
  (state: LeadsState) => state.leads
)

export const selectedUser = createSelector(
  selectLeads,
  (state: LeadsState) => state.selectedUser
)

export const selectLead = (id: number) => createSelector(
  selectLeads,
  (state: LeadsState) => {
    const index = state.leads.map(c => c.ID).indexOf(Number(id))
    return (index != -1) ? state.leads[index] : null
  }
)

export const selectLeadsTotal = (request: string) => createSelector(
  selectLeads,
  (state: LeadsState) => state.loaded.has(request) ? state.loaded.get(request) : 0
)

export const selectFilteredLeads = (filter: ListFilter) => createSelector(
  selectLeads,
  (state: LeadsState) => _filter(state.leads.slice(0), filter)
)

export const selectLoadedLeads = createSelector(
  selectLeads,
  (state: LeadsState) => state.loaded
)

export const selectLeadsSearchFilter = createSelector(
  selectLeads,
  (state: LeadsState) => state.currentSearch
)

export const selectLeadsSearch = createSelector(
  selectLeads,
  selectLeadsSearchFilter,
  (state: LeadsState, filter: ListFilter) => _filter(state.leads.slice(0), filter)
)

export const selectCurrentPageFilter = createSelector(
  selectLeads,
  (state: LeadsState) => state.currentPage
)

export const selectCurrentPage = createSelector(
  selectLeads,
  selectCurrentPageFilter,
  (state: LeadsState, filter: ListFilter) => _filter(state.leads.slice(0), filter)
)

export const selectLeadsCurrentTotal = createSelector(
  selectLeads,
  selectCurrentPageFilter,
  (state: LeadsState, filter: ListFilter) => state.loaded.get(FilterToString(filter))
)

export const selectLeadsCurrentPassiveTotal = createSelector(
  selectCurrentPage,
  (leads: Lead[]) => leads.filter(l => !l.Step.Active).length
)

export const selectLeadsSearchTotal = createSelector(
  selectLeads,
  (state: LeadsState) => state.searchTotal
)

//can't fully check query :-/ I have to reproduce search search algo here then
function _valid(l: Lead, filter: ListFilter): boolean {
  if (filter.completed || l.ClosedAt) {
    if (filter.min_date && new Date(l.ClosedAt) <= new Date(filter.min_date)) {
      return false
    }
    if (filter.max_date && new Date(l.ClosedAt) > new Date(filter.max_date)) {
      return false
    }   
  }
  if (filter.active && l.ClosedAt != null) {
    return false
  }
  if (filter.step && l.Step.ID != filter.step) {
    return false
  }
  if (filter.query && !_queryCheck(l, filter.query)) {
    return false
  }
  if (filter.responsible && l.Responsible.ID != filter.responsible) {
    return false
  }
  if (filter.contact && l.Contact.ID != filter.contact) {
    return false
  }
  return true
}

function _queryCheck(c: Lead, query: string): boolean {
  const q = query.toLowerCase()
  return c.Name.toLowerCase().includes(q)
}

function _filter(leads: Lead[], filter: ListFilter): Lead[] {
  // console.log(filter)
  if (Object.keys(filter).length === 0) {
    return []
  }
  // console.log(filter)
  const filtered = leads.filter(c => _valid(c, filter))
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