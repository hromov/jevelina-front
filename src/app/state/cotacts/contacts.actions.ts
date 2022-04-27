import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter } from '../../models/model';
  
export const retrievedContactsList = createAction(
  '[Contacts Service] List Success',
  props<{ contacts: Contact[], total: number, filter: ListFilter }>()
);

export const contactsRequired = createAction(
  '[Contacts List / Search Component] contactsRequired',
  props<{ filter: ListFilter}>()
)

export const contactsPageChanged = createAction(
  '[Contacts List] Page Changed',
  props<{ filter: ListFilter}>()
)

export const contactsSearchChanged = createAction(
  '[Search Component] Search Changed',
  props<{ filter: ListFilter}>()
)