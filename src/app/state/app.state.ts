import { Contact, Lead, ListFilter, Manufacturer, Product, Role, Source, Step, User } from "../shared/model";

export interface AppState {
  contacts: ContactsState;
  leads: LeadsState;
  misc: MiscState;
}

export interface ContactsState {
  contacts: ReadonlyArray<Contact>;
  loaded: Readonly<Map<string, number>>;
  currentPage: ListFilter,
  currentSearch: ListFilter,
  searchTotal: number,
}

export interface LeadsState {
  leads: ReadonlyArray<Lead>;
  // total: Readonly<number>;
  loaded: Readonly<Map<string,number>>;
  currentSearch: ListFilter,
  currentPage: ListFilter,
  searchTotal: number,
  // current: Readonly<ListFilter>;
}

export interface MiscState {
  steps: ReadonlyArray<Step>
  users: ReadonlyArray<User>
  roles: ReadonlyArray<Role>
  sources: ReadonlyArray<Source>
  products: ReadonlyArray<Product>
  manufacturers: ReadonlyArray<Manufacturer>
  // I'm no ready for this
  // tasks: ReadonlyArray<Task>
}