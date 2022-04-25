import { Contact, Lead, ListFilter } from "../models/model";

export interface AppState {
  contacts: ContactsState;
  leads: LeadsState;
}

export interface ContactsState {
  contacts: ReadonlyArray<Contact>;
  total: Readonly<number>;
  loaded: Readonly<string[]>;
  current: Readonly<ListFilter>;
}

export interface LeadsState {
  leads: ReadonlyArray<Lead>;
  total: Readonly<number>;
  loaded: Readonly<string[]>;
  current: Readonly<ListFilter>;
}