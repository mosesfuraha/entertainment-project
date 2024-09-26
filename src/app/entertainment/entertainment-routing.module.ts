import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { EntertainmentComponent } from './entertainment.component';
import { HomeComponent } from './home/home.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'movies', component: MoviesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'tv-series', component: TvSeriesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmentRoutingModule {}
