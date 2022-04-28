import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter, Step, User } from '../../models/model';
  
export const retrievedSteps = createAction(
  '[Misc Service] Steps Loaded',
  props<{ steps: Step[] }>()
);

export const retrievedUsers = createAction(
  '[Misc Service] Users Loaded',
  props<{ users: User[] }>()
);