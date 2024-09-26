import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntertainmentState } from './entertainment.reducers';
import { selectAllEntertainment } from './entertainment.reducers';

// Feature selector for the entertainment state
export const selectEntertainmentState =
  createFeatureSelector<EntertainmentState>('entertainment');

// Selector to get all content items from the state
export const selectContent = createSelector(
  selectEntertainmentState,
  selectAllEntertainment
);

// Selector to get the loading state
export const selectLoading = createSelector(
  selectEntertainmentState,
  (state: EntertainmentState) => state.loading
);

// Selector to get the error message (if any)
export const selectError = createSelector(
  selectEntertainmentState,
  (state: EntertainmentState) => state.error
);
