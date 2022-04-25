import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter } from '../contacts/contacts.model';
  
export const retrievedContactList = createAction(
  '[Contacts Service] List Success',
  props<{ contacts: Contact[], total: number, current: ListFilter }>()
);

export const changeFilter = createAction(
  '[Contacts List] Paginator Changed required list',
  props<{ current: ListFilter}>()
)

// export const setTotal = createAction(
//   '[Contacts Service] Set Total',
//   props<{total: number}>()
// )