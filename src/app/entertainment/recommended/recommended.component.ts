import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { markMovieBooked } from '../store/entertainment.action';
import { AuthService } from '../../auth/auth.service';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit, OnChanges {
  @Input() searchTerm: string | null = '';
  recommendedContent$!: Observable<ContentItem[]>;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecommendedContent();
    this.isLoggedIn$ = this.authService.isAuthenticated();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.loadRecommendedContent();
    }
  }

  private loadRecommendedContent(): void {
    this.recommendedContent$ = this.store.select(selectAllEntertainment).pipe(
      debounceTime(300),
      map((content: ContentItem[]) =>
        content.filter(
          (item) =>
            !item.isTrending &&
            (this.searchTerm
              ? item.title
                  .toLowerCase()
                  .includes(this.searchTerm.toLowerCase()) ||
                item.category
                  .toLowerCase()
                  .includes(this.searchTerm.toLowerCase()) ||
                item.rating
                  .toLowerCase()
                  .includes(this.searchTerm.toLowerCase())
              : true)
        )
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
