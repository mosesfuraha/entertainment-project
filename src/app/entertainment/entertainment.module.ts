import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntertainmentRoutingModule } from './entertainment-routing.module';
import { EntertainmentComponent } from './entertainment.component';
import { MoviesComponent } from './movies/movies.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './trending/trending.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { entertainmentReducer } from './store/entertainment.reducers';
import { EntertainmentEffects } from './store/entertainment.effects';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { SearchComponent } from './search/search.component';
import { BookedMoviesComponent } from './booked-movies/booked-movies.component';

@NgModule({
  declarations: [
    EntertainmentComponent,
    MoviesComponent,
    SidebarComponent,
    HomeComponent,
    TrendingComponent,
    RecommendedComponent,
    TvSeriesComponent,
    SearchComponent,
    BookedMoviesComponent,
  ],
  imports: [
    CommonModule,
    EntertainmentRoutingModule,
    HttpClientModule,

    StoreModule.forFeature('entertainment', entertainmentReducer),

    EffectsModule.forFeature([EntertainmentEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class EntertainmentModule {}
