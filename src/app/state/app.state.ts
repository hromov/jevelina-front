import { Contact, Lead, ListFilter, Step } from "../models/model";

export interface AppState {
  contacts: ContactsState;
  leads: LeadsState;
  misc: MiscState;
}

export interface ContactsState {
  contacts: ReadonlyArray<Contact>;
  loaded: Readonly<Map<string, number>>;
}

export interface LeadsState {
  leads: ReadonlyArray<Lead>;
  // total: Readonly<number>;
  loaded: Readonly<Map<string,number>>;
  // current: Readonly<ListFilter>;
}

export interface MiscState {
  steps: ReadonlyArray<Step>
}