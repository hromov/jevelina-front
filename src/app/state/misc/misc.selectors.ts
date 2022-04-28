import { createSelector } from '@ngrx/store';
import { AppState, MiscState } from '../app.state';
 
export const selectMisc = (state: AppState) => state.misc;

export const selectSteps = createSelector(
    selectMisc,
    (state: MiscState) => state.steps
)

export const selectUsers = createSelector(
    selectMisc,
    (state: MiscState) => state.users
)

export const selectRoles = createSelector(
    selectMisc,
    (state: MiscState) => state.roles
)