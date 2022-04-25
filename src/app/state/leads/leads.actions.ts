import { createAction, props, union } from '@ngrx/store';
import { Lead, ListFilter } from '../../models/model';
  
export const retrievedLeadList = createAction(
  '[Leads Service] List Success',
  props<{ leads: Lead[], total: number, current: ListFilter }>()
);

export const changeFilter = createAction(
  '[Leads List] Paginator Changed required list',
  props<{ current: ListFilter}>()
)