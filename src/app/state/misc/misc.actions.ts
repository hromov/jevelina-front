import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter, Role, Step, User } from '../../models/model';
  
export const retrievedSteps = createAction(
  '[Misc Service] Steps Loaded',
  props<{ steps: Step[] }>()
);

export const retrievedUsers = createAction(
  '[Misc Service] Users Loaded',
  props<{ users: User[] }>()
);

export const retrievedRoles = createAction(
  '[Misc Service] Roles Loaded',
  props<{ roles: Role[] }>()
);

export const userChanged = createAction(
  '[User Dialog] User Updated or Added',
  props<{ user: User }>()
);

export const userDeleted = createAction(
  '[User Dialog] User Deleted',
  props<{ userID: number }>()
);

export const roleChanged = createAction(
  '[Role Dialog] Role Updated or Added',
  props<{ role: Role }>()
);

export const roleDeleted = createAction(
  '[Role Dialog] Role Deleted',
  props<{ roleID: number }>()
);