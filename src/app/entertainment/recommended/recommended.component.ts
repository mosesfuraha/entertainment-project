import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentItem } from '../models/data.interface';
import { AppState, selectAllEntertainment } from '../store/entertainment.reducers';


@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit {
  recommendedContent$!: Observable<ContentItem[]>; 

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Fetch all content and filter out the trending items
    this.recommendedContent$ = this.store.select(selectAllEntertainment).pipe(
      map(
        (content: ContentItem[]) => content.filter((item) => !item.isTrending) 
      )
    );
  }
}
