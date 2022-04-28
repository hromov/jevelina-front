
import { createReducer, on } from '@ngrx/store';
import { MiscState } from '../app.state';
import { retrievedSteps, retrievedUsers } from './misc.actions';


export const initialState: MiscState = { steps: [], users: []};

export const miscsReducer = createReducer(
    initialState,
    on(retrievedSteps, (state, {steps}) => ({...state, steps: steps})),
    on(retrievedUsers, (state, {users}) => ({...state, users: users}))
);

