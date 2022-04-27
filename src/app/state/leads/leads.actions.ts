import { createAction, props, union } from '@ngrx/store';
import { Lead, ListFilter } from '../../models/model';

export const retrievedLeadsList = createAction(
  '[Leads Service] List Success',
  props<{ leads: Lead[], total: number, filter: ListFilter }>()
);

// export const changeFilter = createAction(
//   '[Leads List] Paginator Changed required list',
//   props<{ current: ListFilter}>()
// )
export const leadsRrequired = createAction(
  '[Leads List] Leads Required',
  props<{ filter: ListFilter }>()
)

export const leadsSearchChanged = createAction(
  '[Search Component] Search Changed',
  props<{ filter: ListFilter}>()
)