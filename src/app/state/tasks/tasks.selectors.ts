import { createSelector } from '@ngrx/store';
import { AppState, TasksState } from '../app.state';

export const selectTasks = (state: AppState) => state.tasks;

export const selectTasksFor = (parentID: number) => createSelector(
    selectTasks,
    (state: TasksState) => state.tasks.filter(t => t.ParentID == parentID)
)

export const isTaskLoaded = (parentID: number) => createSelector(
    selectTasks,
    (state: TasksState) => state.loaded.indexOf(parentID) != -1
)