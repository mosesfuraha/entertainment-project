import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content$!: Observable<ContentItem[]>;
  filteredContent$!: Observable<ContentItem[]>;
  searchTerms = new BehaviorSubject<string>('');
  searchMessage: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    const storedContent = localStorage.getItem('content');

    if (storedContent) {
      const parsedContent: ContentItem[] = JSON.parse(storedContent);
      this.content$ = of(parsedContent);
    } else {
      console.error('No data in localStorage');
    }

    this.filteredContent$ = this.searchService
      .getFilteredContent(this.content$)
      .pipe(tap((filteredItems) => this.updateSearchMessage(filteredItems)));
  }

  search(term: string): void {
    this.searchTerms.next(term);
    this.searchService.search(term);
  }

  public updateSearchMessage(filteredItems: ContentItem[]): void {
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
