import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnChanges {
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
    this.trendingContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter(
            (item) =>
              item.isTrending &&
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
}
