
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { LeadsState } from '../app.state';
import { changeFilter, retrievedLeadsList } from './leads.actions';


export const initialState: LeadsState = { leads: [], total: 0, loaded: [], current: {} };

export const leadsReducer = createReducer(
    initialState,
    on(retrievedLeadsList, (state, { leads, total, current }) => ({
        leads: state.leads.concat(leads),
        total: total ? total : state.total,
        loaded: state.loaded.concat(FilterToString(current)),
        current: current,
    })),
    on(changeFilter, (state, { current }) => ({
        ...state,
        current: current
    }))
);

