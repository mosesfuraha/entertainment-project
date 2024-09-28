import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { map } from 'rxjs/operators';
import { markMovieBooked } from '../store/entertainment.action';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit, OnChanges {
  @Input() searchTerm: string | null = '';
  trendingContent$!: Observable<ContentItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.trendingContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter((item) => item.isTrending)
        )
      );
  }

  ngOnChanges(): void {
    this.trendingContent$ = this.store.select(selectAllEntertainment).pipe(
      map((content: ContentItem[]) =>
        content.filter((item) => {
          const matchesSearchTerm = this.searchTerm
            ? item.title
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
              item.category
                .toLowerCase()
                .includes(this.searchTerm.toLowerCase()) ||
              item.rating.toLowerCase().includes(this.searchTerm.toLowerCase())
            : true;

          return item.isTrending && matchesSearchTerm;
        })
      )
    );
  }

  toggleBookmark(item: ContentItem): void {
    this.store.dispatch(
      markMovieBooked({
        movieId: item.id,
        ismovieBooked: !item.isBookmarked,
      })
    );
  }
}
