import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import { AppState } from '../store/entertainment.reducers';
import { selectBookmarkedMoviesByUser } from '../store/entertainment.selectors';
import { AuthService } from '../../auth/auth.service';
import { markMovieBooked } from '../store/entertainment.action';

@Component({
  selector: 'app-booked-movies',
  templateUrl: './booked-movies.component.html',
  styleUrls: ['./booked-movies.component.css'],
})
export class BookedMoviesComponent implements OnInit {
  bookedMovies$!: Observable<ContentItem[]>;
  userId!: string | null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService
      .getCurrentUser()
      ?.pipe(
        filter((user) => !!user),
        switchMap((user) => {
          this.userId = user.uid;
          console.log('User logged in with ID:', this.userId);
          this.bookedMovies$ = this.store.select(
            selectBookmarkedMoviesByUser(this.userId)
          );
          return this.bookedMovies$;
        })
      )
      .subscribe();
  }

  toggleBookmark(movie: ContentItem): void {
    this.store.dispatch(
      markMovieBooked({
        movieId: movie.id,
        ismovieBooked: !movie.isBookmarked,
        userId: this.userId,
      })
    );
  }
}
