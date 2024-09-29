import { createAction, props } from '@ngrx/store';
import { ContentItem } from '../models/data.interface';

export const loadContent = createAction('[Entertainment] Load Content');

export const loadContentSuccess = createAction(
  '[Entertainment] Load Content Success',
  props<{ content: ContentItem[] }>()
);

export const loadContentFailure = createAction(
  '[Entertainment] Load Content Failure',
  props<{ error: string }>()
);

export const markMovieBooked = createAction(
  '[Entertainment] Mark Movie Booked',
  props<{ movieId: string; ismovieBooked: boolean; userId: string | null }>() 
);

