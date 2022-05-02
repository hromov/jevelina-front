import { createAction, props } from '@ngrx/store';
import { ListFilter, Task } from '../../shared/model';
  
export const retrievedTasks = createAction(
  '[Lead or Contact Data Page] Tasks Loaded',
  props<{ tasks: Task[], filter: ListFilter }>()
);

export const tasksRequired = createAction(
  '[Lead or Contact Data Page] Tasks Required',
  props<{ filter: ListFilter }>()
)

export const taskChanged = createAction(
  '[Lead or Contact Data Page] Task Changed or Created',
  props<{ task: Task }>()
);