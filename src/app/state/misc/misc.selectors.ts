import { createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/model';
import { AppState, MiscState } from '../app.state';
 
export const selectMisc = (state: AppState) => state.misc;

export const selectSteps = createSelector(
    selectMisc,
    (state: MiscState) => state.steps || []
)

export const selectSaleStep = createSelector(
  selectMisc,
  (state: MiscState) => state.steps.find(s => s.Order === 10)
)

export const selectedSteps = createSelector(
    selectMisc,
    (state: MiscState) => state.selectedSteps || []
)

export const selectCurrentSteps = createSelector(
    selectMisc,
    selectedSteps,
    (state: MiscState, selected: ReadonlyArray<number>) => state.steps.filter(s => selected.includes(s.ID))
)

export const selectUsers = createSelector(
    selectMisc,
    (state: MiscState) => state.users
)

export const selectUserByID = (id: number) => createSelector(
    selectMisc,
    (state: MiscState) => {
        const index = state.users.map(c => c.ID).indexOf(Number(id))
        return (index != -1) ? state.users[index] : null
    }
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