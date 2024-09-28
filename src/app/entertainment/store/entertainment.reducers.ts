import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ContentItem, addIdToContentItem } from '../models/data.interface';
import {
  loadContent,
  loadContentFailure,
  loadContentSuccess,
  markMovieBooked,
} from './entertainment.action';
import { selectEntertainmentState } from './entertainment.selectors';

export interface EntertainmentState extends EntityState<ContentItem> {
  loading: boolean;
  error: string | null;
}
export interface AppState {
  entertainment: EntertainmentState;
}
export const adapter: EntityAdapter<ContentItem> =
  createEntityAdapter<ContentItem>();

export const initialState: EntertainmentState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const entertainmentReducer = createReducer(
  initialState,

  on(loadContent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadContentSuccess, (state, { content }) =>
    adapter.setAll(content.map(addIdToContentItem), {
      ...state,
      loading: false,
    })
  ),

  on(loadContentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(markMovieBooked, (state, { movieId, ismovieBooked }) =>
    adapter.updateOne(
      {
        id: movieId,
        changes: { isBookmarked: ismovieBooked },
      },
      state
    )
  )
);

export const {
  selectIds: selectEntertainmentIds,
  selectEntities: selectEntertainmentEntities,
  selectAll: selectAllEntertainment,
  selectTotal: selectEntertainmentTotal,
} = adapter.getSelectors(selectEntertainmentState);
