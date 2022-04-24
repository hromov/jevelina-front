import { createAction, props } from '@ngrx/store';
import { Contact } from '../contacts/contacts.model';
 
export const addContact = createAction(
  '[Contact List] Add Contact',
  props<{ contactId: number }>()
);
 
export const removeContact = createAction(
  '[Contact List] Remove Contact',
  props<{ contactId: number }>()
);
 
export const retrievedContactList = createAction(
  '[Contact List/API] Retrieve Contact Success',
  props<{ contacts: ReadonlyArray<Contact> }>()
);

export const setTotal = createAction(
  '[Contact List] Set Total',
  props<{total: number}>()
)