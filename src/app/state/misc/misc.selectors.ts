import { createSelector } from '@ngrx/store';
import { AppState, MiscState } from '../app.state';
 
export const selectMisc = (state: AppState) => state.misc;

export const selectSteps = createSelector(
    selectMisc,
    (state: MiscState) => state.steps || []
)

export const selectUsers = createSelector(
    selectMisc,
    (state: MiscState) => state.users
)

export const selectRoles = createSelector(
    selectMisc,
    (state: MiscState) => state.roles
)

export const selectSources = createSelector(
    selectMisc,
    (state: MiscState) => state.sources
)

export const selectProducts = createSelector(
    selectMisc,
    (state: MiscState) => state.products
)

export const selectManufacturers = createSelector(
    selectMisc,
    (state: MiscState) => state.manufacturers
)