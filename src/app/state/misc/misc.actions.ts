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

export const userChanged = createAction(
  '[User Dialog] User Updated or Added',
  props<{ user: User }>()
);

export const userDeleted = createAction(
  '[User Dialog] User Deleted',
  props<{ userID: number }>()
);