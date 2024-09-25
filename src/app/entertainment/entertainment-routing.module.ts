import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { EntertainmentComponent } from './entertainment.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: EntertainmentComponent,
    children: [
      { path: 'movies', component: MoviesComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertainmentRoutingModule {}
