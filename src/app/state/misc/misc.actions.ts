import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter, Manufacturer, Product, Role, Source, Step, User } from '../../shared/model';

export const retrievedSteps = createAction(
  '[Misc Service] Steps Loaded',
  props<{ steps: Step[] }>()
);

export const selectedStepsChanged = createAction(
  '[Steps Selector] Selecteion Changed',
  props<{ selected: number[] }>()
)

export const retrievedUsers = createAction(
  '[Misc Service] Users Loaded',
  props<{ users: User[] }>()
);

export const retrievedRoles = createAction(
  '[Misc Service] Roles Loaded',
  props<{ roles: Role[] }>()
);

export const retrievedSources = createAction(
  '[Misc Service] Sources Loaded',
  props<{ sources: Source[] }>()
);

export const retrievedProducts = createAction(
  '[Misc Service] Products Loaded',
  props<{ products: Product[] }>()
);

export const retrievedManufacturers = createAction(
  '[Misc Service] Manufacturers Loaded',
  props<{ manufacturers: Manufacturer[] }>()
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

export const stepChanged = createAction(
  '[Settings / Steps Tab] Step Updated or Added',
  props<{ step: Step }>()
);

export const stepDeleted = createAction(
  '[Settings / Steps Tab] Step Deleted',
  props<{ stepID: number }>()
);