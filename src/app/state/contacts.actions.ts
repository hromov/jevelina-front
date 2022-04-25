import { createAction, props } from '@ngrx/store';
import { Contact } from '../contacts/contacts.model';
  
export const retrievedContactList = createAction(
  '[Contacts Service] List Success',
  props<{ contacts: Contact[], total: number }>()
);

// export const setTotal = createAction(
//   '[Contacts Service] Set Total',
//   props<{total: number}>()
// )