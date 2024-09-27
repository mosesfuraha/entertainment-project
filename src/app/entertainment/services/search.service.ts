import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerms = new Subject<string>();

  constructor() {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getFilteredContent(
    content$: Observable<ContentItem[]>
  ): Observable<ContentItem[]> {
    return this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        content$.pipe(map((content) => this.filterContent(content, term)))
      )
    );
  }

  private filterContent(content: ContentItem[], term: string): ContentItem[] {
    if (!term) {
      return content;
    }
    const searchTermLower = term.toLowerCase();
    return content.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTermLower) ||
        item.category.toLowerCase().includes(searchTermLower) ||
        item.year.toString().includes(term) ||
        item.rating.toLowerCase().includes(searchTermLower)
    );
  }
}
