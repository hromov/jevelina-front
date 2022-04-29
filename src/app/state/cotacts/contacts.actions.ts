import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter } from '../../shared/model';
  
export const retrievedContactsList = createAction(
  '[Contacts Service / Effects] List Success',
  props<{ contacts: Contact[], total: number, filter: ListFilter }>()
);

export const contactsRequired = createAction(
  '[Contacts List / Search Component] Contacts Required',
  props<{ filter: ListFilter}>()
)

export const contactRequired = createAction(
  '[Contacts Component] Contact Requested',
  props<{ id: number}>()
)

export const contactRecieved = createAction(
  '[Contacts Service / Effects] Contact Recived',
  props<{ contact: Contact}>()
)

export const contactsPageChanged = createAction(
  '[Contacts List] Page Changed',
  props<{ filter: ListFilter}>()
)

export const contactsSearchChanged = createAction(
  '[Search Component] Search Changed',
  props<{ filter: ListFilter}>()
)

// export const contactChanged = createAction(
//   '[Contact Data] Contact Updated or Added',
//   props<{ contact: Contact }>()
// );