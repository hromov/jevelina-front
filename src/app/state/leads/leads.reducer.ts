
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { LeadsState } from '../app.state';
import { retrievedLeadsList } from './leads.actions';

export const initialState: LeadsState = { leads: [], loaded: new Map() };

export const leadsReducer = createReducer(
    initialState,
    on(retrievedLeadsList, (state, { leads, total, filter }) => ({
        leads: [...new Set([...state.leads,...leads])],
        loaded: state.loaded.set(FilterToString(filter), total),

    })),
);

