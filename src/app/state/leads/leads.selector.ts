import { createSelector } from '@ngrx/store';
import { Lead, ListFilter } from 'src/app/models/model';
import { AppState, LeadsState } from '../app.state';
 
export const selectLeads = (state: AppState) => state.leads;

export const selectAllLeads = createSelector(
    selectLeads,
    (state: LeadsState) => state.leads
)

export const selectLeadsTotal = (request: string) => createSelector(
    selectLeads,
    (state: LeadsState) => state.loaded.has(request) ? state.loaded.get(request) : 0
)

export const selectFilteredLeads = (filter: ListFilter) => createSelector(
    selectLeads,
    (state: LeadsState) => {
        const filtered = state.leads.filter(l => _valid(l, filter))
        // console.group('lead selector = ', filter.step)
        // console.log(filter.step, filter, filtered)
        if (!filtered || filter.offset === undefined || filter.limit === undefined) {
            return filtered
        }
        if (!filtered || filter.offset > filtered.length) {
            // console.log('filtered because of offset')
            return []
        }
        if (filtered.length < (filter.offset + filter.limit)) {
            // console.log('short return')
            return filtered.slice(filter.offset,filtered.length)
        }
        // console.log('full return')
        // console.groupEnd()
        return filtered.slice(filter.offset, filter.offset+filter.limit)
    }
)

export const selectLoadedLeads = createSelector(
    selectLeads,
    (state : LeadsState) => state.loaded
)

//can't fully check query :-/ I have to reproduce search search algo here then
function _valid(l: Lead, filter: ListFilter): boolean {
    if (filter.active && l.ClosedAt != null) {
        return false
    }
    if (filter.step && l.StepID != filter.step) {
        return false
    }
    if (filter.query && !_queryCheck(l, filter.query)) {
        return false
    }
    return true
}

function _queryCheck(c: Lead, query: string): boolean {
    const q = query.toLowerCase()
    return c.Name.toLowerCase().includes(q)
}