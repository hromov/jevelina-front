import { Contact, ListFilter } from "../models/model";

export interface AppState {
  contacts: ContactsState;
}

export interface ContactsState {
  contacts: ReadonlyArray<Contact>;
  total: Readonly<number>;
  loaded: Readonly<string[]>;
  current: Readonly<ListFilter>;
}