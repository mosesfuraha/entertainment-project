import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { SearchService } from '../services/search.service';
import { markMovieBooked } from '../store/entertainment.action';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css'],
})
export class TvSeriesComponent implements OnInit {
  @Input() searchTerm: string | null = '';
  tvSeriesContent$!: Observable<ContentItem[]>;
  isLoggedIn$!: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTvSeriesContent();

    this.searchService
      .getFilteredContent(this.tvSeriesContent$)
      .subscribe((filteredContent) => {
        this.tvSeriesContent$ = new Observable((observer) => {
          observer.next(filteredContent);
          observer.complete();
        });
      });
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  private loadTvSeriesContent(): void {
    this.tvSeriesContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter(
            (item) => item.category === 'TV Series' && !item.isBookmarked
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
                backgroundColor: '#ff5a5f',
                stopOnFocus: true,
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
          backgroundColor: '#ff5a5f',
          stopOnFocus: true,
        }).showToast();
      }
    });
  }
}
