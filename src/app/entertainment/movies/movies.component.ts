import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ContentItem } from '../models/data.interface';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { SearchService } from '../services/search.service'; // Make sure to import the SearchService

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @Input() searchTerm: string | null = ''; 
  moviesContent$!: Observable<ContentItem[]>;

  constructor(
    private store: Store<AppState>,
    private searchService: SearchService 
  ) {}

  ngOnInit(): void {
    this.loadMoviesContent();


    this.searchService
      .getFilteredContent(this.moviesContent$)
      .subscribe((filteredContent) => {
        this.moviesContent$ = new Observable((observer) => {
          observer.next(filteredContent);
          observer.complete();
        });
      });
  }

  private loadMoviesContent(): void {
    this.moviesContent$ = this.store
      .select(selectAllEntertainment)
      .pipe(
        map((content: ContentItem[]) =>
          content.filter((item) => item.category === 'Movie')
        )
      );
  }

  onSearch(term: string): void {
    this.searchService.search(term);
  }
}
