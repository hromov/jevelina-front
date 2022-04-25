import { createSelector } from '@ngrx/store';
import { Lead } from 'src/app/models/model';
import { AppState, LeadsState } from '../app.state';
 
export const selectLeads = (state: AppState) => state.leads;

export const selectAll = createSelector(
    selectLeads,
    (state: LeadsState) => state.leads
)

export const selectTotal = createSelector(
    selectLeads,
    (state: LeadsState) => state.total
)

export const selectCurrent = createSelector(
    selectLeads,
    (state: LeadsState) => {
        return state.leads.slice(state.current.offset, state.current.offset+state.current.limit)
    }
)

export const selectLoaded = createSelector(
    selectLeads,
    (state : LeadsState) => state.loaded
)

export const selectLeadsByStep = (step: number) => createSelector(
    selectLeads,
    (state: LeadsState) => state && state.leads ? state.leads.filter(lead => lead.StepID == step) : []
)
