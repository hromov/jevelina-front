import { Contact } from "../contacts/contacts.model";

export interface AppState {
  contacts: ContactsState;
}

export interface ContactsState {
  contacts: ReadonlyArray<Contact>;
  total: Readonly<number>;
}