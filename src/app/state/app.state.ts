import { Contact, ListFilter } from "../contacts/contacts.model";

export interface AppState {
  contacts: ContactsState;
}

export interface ContactsState {
  contacts: ReadonlyArray<Contact>;
  total: Readonly<number>;
  loaded: Readonly<string[]>;
  current: Readonly<ListFilter>;
}