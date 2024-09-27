import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { loadContent } from '../store/entertainment.action';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { ContentItem } from '../models/data.interface';
import { SearchService } from '../services/search.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content$!: Observable<ContentItem[]>;
  filteredContent$!: Observable<ContentItem[]>;
  searchTerms = new BehaviorSubject<string>(''); // Initialize BehaviorSubject with an empty string
  searchMessage: string = ''; // Message for search results

  constructor(
    private store: Store<AppState>,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadContent());

    // Get the content from the store
    this.content$ = this.store.pipe(select(selectAllEntertainment));

    // Pass content$ to the SearchService and handle filtered results
    this.filteredContent$ = this.searchService
      .getFilteredContent(this.content$) // Pass content$ to the search service
      .pipe(tap((filteredItems) => this.updateSearchMessage(filteredItems)));
  }

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchService.search(term);
  }

  private updateSearchMessage(filteredItems: ContentItem[]): void {
    const numResults = filteredItems.length;
    const searchTerm = this.searchTerms.getValue();

    if (numResults === 0) {
      this.searchMessage = `No results found for "${searchTerm}"`;
    } else if (numResults === 1) {
      this.searchMessage = `Found 1 result for "${searchTerm}"`;
    } else {
      this.searchMessage = `Found ${numResults} results for "${searchTerm}"`;
    }
  }
}

