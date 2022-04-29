import { createAction, props } from '@ngrx/store';
import { Task } from '../../shared/model';
  
export const retrievedTasks = createAction(
  '[Lead or Contact Data Page] Tasks Loaded',
  props<{ tasks: Task[], parentID: number }>()
);

export const tasksRequired = createAction(
  '[Lead or Contact Data Page] Tasks Required',
  props<{ parentID: number}>()
)

export const taskChanged = createAction(
  '[Lead or Contact Data Page] Task Changed or Created',
  props<{ task: Task }>()
);