import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
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
}
