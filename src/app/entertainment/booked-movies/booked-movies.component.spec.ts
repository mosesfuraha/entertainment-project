import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedMoviesComponent } from './booked-movies.component';

describe('BookedMoviesComponent', () => {
  let component: BookedMoviesComponent;
  let fixture: ComponentFixture<BookedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookedMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
