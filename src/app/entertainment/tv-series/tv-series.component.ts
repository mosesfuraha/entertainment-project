import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { SearchService } from '../services/search.service';
import { markMovieBooked } from '../store/entertainment.action';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css'],
})
export class TvSeriesComponent implements OnInit {
  @Input() searchTerm: string | null = '';
  tvSeriesContent$!: Observable<ContentItem[]>;

  constructor(
    private store: Store<AppState>,
    private searchService: SearchService
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
  }

  private loadTvSeriesContent(): void {
    this.tvSeriesContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter((item) => item.category === 'TV Series')
        )
      );
  }

  onSearch(term: string): void {
    this.searchService.search(term);
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
