import { Contact } from "../contacts/contacts.model";

export interface AppState {
  contacts: ReadonlyArray<Contact>;
  totalContacts: Readonly<number>;
}