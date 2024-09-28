import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { markMovieBooked } from '../store/entertainment.action';

@Component({
  selector: 'app-booked-movies',
  templateUrl: './booked-movies.component.html',
  styleUrls: ['./booked-movies.component.css'],
})
export class BookedMoviesComponent implements OnInit {
  bookedMovies$!: Observable<ContentItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadBookedMovies();
  }

  private loadBookedMovies(): void {
    this.bookedMovies$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter((item) => item.isBookmarked)
        )
      );
  }
  toggleBookmark(movie: ContentItem): void {
    this.store.dispatch(
      markMovieBooked({
        movieId: movie.id,
        ismovieBooked: !movie.isBookmarked,
      })
    );
  }
}
