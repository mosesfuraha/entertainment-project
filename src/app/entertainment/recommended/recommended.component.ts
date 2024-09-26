import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit, OnChanges {
  @Input() searchTerm: string | null = '';
  recommendedContent$!: Observable<ContentItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadRecommendedContent();
  }

  ngOnChanges(): void {
    this.loadRecommendedContent();
  }

  private loadRecommendedContent(): void {
    this.recommendedContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
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
}
