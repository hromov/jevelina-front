import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter } from '../../models/model';
  
export const retrievedContactsList = createAction(
  '[Contacts Service] List Success',
  props<{ contacts: Contact[], total: number, current: ListFilter }>()
);

export const changeContactsFilter = createAction(
  '[Contacts List] Paginator Changed required list',
  props<{ current: ListFilter}>()
)