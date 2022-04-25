import { createAction, props, union } from '@ngrx/store';
import { Contact, ListFilter, Step } from '../../models/model';
  
export const retrievedSteps = createAction(
  '[Misc Service] Steps Loaded',
  props<{ steps: Step[] }>()
);