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
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @Input() searchTerm: string | null = '';
  moviesContent$!: Observable<ContentItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadMoviesContent();
  }

  private loadMoviesContent(): void {
    this.moviesContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter(
            (item) =>
              item.category === 'Movie' &&
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
