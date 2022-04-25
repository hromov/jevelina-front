
import { createReducer, on } from '@ngrx/store';
import { MiscState } from '../app.state';
import { retrievedSteps } from './misc.actions';


export const initialState: MiscState = { steps: []};

export const miscsReducer = createReducer(
    initialState,
    on(retrievedSteps, (step, {steps}) => ({...step, steps: steps}))
);

