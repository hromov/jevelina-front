import { Contact, Lead, ListFilter, Manufacturer, Product, Role, Source, Step, Task, Transfer, User, Wallet } from "../shared/model";

export interface AppState {
  contacts: ContactsState;
  leads: LeadsState;
  misc: MiscState;
  tasks: TasksState;
  finance: FinanceState;
}

export interface TasksState {
  tasks: ReadonlyArray<Task>;
  loaded: Readonly<Map<string, true>>;
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
  selectedUser: number,
  // current: Readonly<ListFilter>;
}

export interface MiscState {
  steps: ReadonlyArray<Step>
  users: ReadonlyArray<User>
  roles: ReadonlyArray<Role>
  sources: ReadonlyArray<Source>
  products: ReadonlyArray<Product>
  manufacturers: ReadonlyArray<Manufacturer>
  selectedSteps: ReadonlyArray<number>
  // I'm no ready for this
  // tasks: ReadonlyArray<Task>
}

export interface FinanceState {
  wallets: ReadonlyArray<Wallet>
  transfers: ReadonlyArray<Transfer>;
  // total: Readonly<number>;
  loadedTransfers: Readonly<Map<string,number>>;
  transfersPage: ListFilter,
  // TODO: probbably remove in favor of selector from loaded
  transfersPageTotal: number,
}