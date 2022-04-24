import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Contact } from '../contacts/contacts.model';
 
export const selectContacts = createFeatureSelector<ReadonlyArray<Contact>>('contacts');
export const selectTotal = createFeatureSelector<Readonly<number>>('totalContacts')