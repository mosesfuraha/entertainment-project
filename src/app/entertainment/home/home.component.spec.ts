import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchService } from '../services/search.service';
import { of } from 'rxjs';
import { ContentItem } from '../models/data.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let searchService: jest.Mocked<SearchService>;

  beforeEach(async () => {
    const searchServiceMock = {
      getFilteredContent: jest.fn().mockReturnValue(of([])),
      search: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService) as jest.Mocked<SearchService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize content$ from localStorage', () => {
    const storedContent = JSON.stringify([
      {
        id: '1',
        title: 'Test Content',
        thumbnail: { regular: { small: '', medium: '', large: '' } },
        year: 2021,
        category: 'Movie',
        rating: 'PG',
        isBookmarked: false,
        isTrending: false,
      },
    ]);
    localStorage.setItem('content', storedContent);

    component.ngOnInit();

    component.content$.subscribe((content) => {
      expect(content).toEqual([
        {
          id: '1',
          title: 'Test Content',
          thumbnail: { regular: { small: '', medium: '', large: '' } },
          year: 2021,
          category: 'Movie',
          rating: 'PG',
          isBookmarked: false,
          isTrending: false,
        },
      ]);
    });
  });

  it('should update search message correctly', () => {
    component.updateSearchMessage([]);
    expect(component.searchMessage).toBe('No results found for ""');

    component.searchTerms.next('test');
    component.updateSearchMessage([
      {
        id: '1',
        title: 'Test Content',
        thumbnail: { regular: { small: '', medium: '', large: '' } },
        year: 2021,
        category: 'Movie',
        rating: 'PG',
        isBookmarked: false,
        isTrending: false,
      },
    ]);
    expect(component.searchMessage).toBe('Found 1 result for "test"');

    component.updateSearchMessage([
      {
        id: '1',
        title: 'Test Content',
        thumbnail: { regular: { small: '', medium: '', large: '' } },
        year: 2021,
        category: 'Movie',
        rating: 'PG',
        isBookmarked: false,
        isTrending: false,
      },
      {
        id: '2',
        title: 'Another Test Content',
        thumbnail: { regular: { small: '', medium: '', large: '' } },
        year: 2021,
        category: 'Movie',
        rating: 'PG',
        isBookmarked: false,
        isTrending: false,
      },
    ]);

    expect(component.searchMessage).toBe('Found 2 results for "test"');
  });
  it('should call searchService.search with the correct term', () => {
    const searchTerm = 'example';
    component.search(searchTerm);
    expect(searchService.search).toHaveBeenCalledWith(searchTerm);
  });
});
