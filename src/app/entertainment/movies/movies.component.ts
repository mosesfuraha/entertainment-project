import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { SearchService } from '../services/search.service';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { markMovieBooked } from '../store/entertainment.action';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @Input() searchTerm: string | null = '';
  moviesContent$!: Observable<ContentItem[]>;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMoviesContent();

    this.searchService
      .getFilteredContent(this.moviesContent$)
      .subscribe((filteredContent) => {
        this.moviesContent$ = new Observable((observer) => {
          observer.next(filteredContent);
          observer.complete();
        });
      });
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  private loadMoviesContent(): void {
    this.moviesContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter(
            (item) => item.category === 'Movie' && !item.isBookmarked
          )
        )
      );
  }

  onSearch(term: string): void {
    this.searchService.search(term);
  }

  toggleBookmark(item: ContentItem): void {
    this.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.authService
          .getCurrentUser()
          .pipe(take(1))
          .subscribe((user) => {
            if (user && user.uid) {
              this.store.dispatch(
                markMovieBooked({
                  movieId: item.id,
                  ismovieBooked: !item.isBookmarked,
                  userId: user.uid,
                })
              );
            } else {
              Toastify({
                text: 'Error: Unable to identify user. Please try again.',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                  background: '#ff5a5f',
                },
              }).showToast();
            }
          });
      } else {
        Toastify({
          text: 'Please log in to bookmark movies.',
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: '#ff5a5f',
          },
        }).showToast();
      }
    });
  }
}
