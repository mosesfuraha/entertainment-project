import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { markMovieBooked } from '../store/entertainment.action';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit, OnChanges {
  @Input() searchTerm: string | null = '';
  trendingContent$!: Observable<ContentItem[]>;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTrendingContent();
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  ngOnChanges(): void {
    this.loadTrendingContent();
  }

  private loadTrendingContent(): void {
    this.trendingContent$ = this.store.select(selectAllEntertainment).pipe(
      map((content: ContentItem[]) =>
        content.filter((item) => {
          const matchesSearchTerm = this.searchTerm
            ? item.title
                .toLowerCase()
                .includes(this.searchTerm!.toLowerCase()) ||
              item.category
                .toLowerCase()
                .includes(this.searchTerm!.toLowerCase()) ||
              item.rating.toLowerCase().includes(this.searchTerm!.toLowerCase())
            : true;

          return item.isTrending && !item.isBookmarked && matchesSearchTerm;
        })
      )
    );
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
