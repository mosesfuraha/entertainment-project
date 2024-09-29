import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntertainmentState } from './entertainment.reducers';
import { selectAllEntertainment } from './entertainment.reducers';
import { ContentItem } from '../models/data.interface';

export const selectEntertainmentState =
  createFeatureSelector<EntertainmentState>('entertainment');

export const selectContent = createSelector(
  selectEntertainmentState,
  selectAllEntertainment
);

export const selectLoading = createSelector(
  selectEntertainmentState,
  (state: EntertainmentState) => state.loading
);

export const selectError = createSelector(
  selectEntertainmentState,
  (state: EntertainmentState) => state.error
);
export const selectBookmarkedMoviesByUser = (userId: string | null) =>
  createSelector(selectAllEntertainment, (allMovies: ContentItem[]) => {
    return allMovies.filter(
      (movie) => movie.isBookmarked && movie.userId === userId
    );
  });