import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntertainmentState } from './entertainment.reducers';

export const selectEntertainmentState =
  createFeatureSelector<EntertainmentState>('entertainment');
