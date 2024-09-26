import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { loadContent } from '../store/entertainment.action';
import {
  AppState,
  selectAllEntertainment,
} from '../store/entertainment.reducers';
import { ContentItem } from '../models/data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content$!: Observable<ContentItem[]>;
  filteredContent$!: Observable<ContentItem[]>;
  searchTerms = new Subject<string>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadContent());

    this.content$ = this.store.pipe(select(selectAllEntertainment));

    this.filteredContent$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.content$.pipe(
          map((content) =>
            content.filter(
              (item) =>
                item.title.toLowerCase().includes(term.toLowerCase()) ||
                item.category.toLowerCase().includes(term.toLowerCase()) ||
                item.year.toString().includes(term) ||
                item.rating.toLowerCase().includes(term.toLowerCase())
            )
          )
        )
      )
    );
  }

  search(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
  }
}
