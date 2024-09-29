import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  loadContent,
  loadContentFailure,
  loadContentSuccess,
} from './entertainment.action';
import { EntertainmentService } from '../entertainment.service';

@Injectable()
export class EntertainmentEffects {
  private actions$ = inject(Actions);

  constructor(private entertainmentService: EntertainmentService) {}

  loadContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContent),
      mergeMap(() =>
        this.entertainmentService.getAllData().pipe(
          map((content) => loadContentSuccess({ content })),
          tap(({ content }) => {
            localStorage.setItem('content', JSON.stringify(content));
          }),
          catchError((error) =>
            of(
              loadContentFailure({
                error: error.message || 'Error loading content',
              })
            )
          )
        )
      )
    )
  );
}
