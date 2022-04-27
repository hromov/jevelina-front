
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { LeadsState } from '../app.state';
import { leadsPageChanged, leadsSearchChanged, retrievedLeadsList } from './leads.actions';

export const initialState: LeadsState = { leads: [], loaded: new Map(), currentSearch: {}, currentPage: {}, searchTotal: 0 };

export const leadsReducer = createReducer(
    initialState,
    on(retrievedLeadsList, (state, { leads, total, filter }) => {
        let unique = new Map()
        state.leads.forEach(l => unique.set(l.ID, l))
        leads.forEach(l => unique.set(l.ID, l))
        //server gives 0 total if offset
        const realTotal = filter.offset ? state.searchTotal : total
        return ({
            ...state,
            leads: [...unique.values()],
            loaded: state.loaded.set(FilterToString(filter), realTotal),
            searchTotal: realTotal,
        })
    }),
    on(leadsSearchChanged, (state, { filter }) => ({
        ...state,
        currentSearch: filter,
    })),
    on(leadsPageChanged, (state, { filter }) => ({
        ...state,
        currentPage: filter,
    })),
);

