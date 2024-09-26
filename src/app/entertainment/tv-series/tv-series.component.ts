import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css'],
})
export class TvSeriesComponent implements OnInit {
  @Input() searchTerm: string | null = '';
  tvSeriesContent$!: Observable<ContentItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadTvSeriesContent();
  }

  private loadTvSeriesContent(): void {
    this.tvSeriesContent$ = this.store.select(selectAllEntertainment).pipe(
      map((content: ContentItem[]) =>
        content.filter(
          (item) =>
            item.category === 'TV Series' && // Filter to show only TV Series
            (this.searchTerm
              ? item.title
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
}
