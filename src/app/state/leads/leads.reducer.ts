
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { LeadsState } from '../app.state';
import { retrievedLeadsList } from './leads.actions';

//no total for groups ?
export const initialState: LeadsState = { leads: [], loaded: [] };

export const leadsReducer = createReducer(
    initialState,
    on(retrievedLeadsList, (state, { leads, filter }) => ({
        leads: state.leads.concat(leads),
        // total: total ? total : state.total,
        loaded: state.loaded.concat(FilterToString(filter)),
        // current: current,
    })),
    // on(changeFilter, (state, { current }) => ({
    //     ...state,
    //     current: current
    // }))
);

