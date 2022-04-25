import { createSelector } from '@ngrx/store';
import { AppState, MiscState } from '../app.state';
 
export const selectMisc = (state: AppState) => state.misc;

export const selectSteps = createSelector(
    selectMisc,
    (state: MiscState) => state.steps
)