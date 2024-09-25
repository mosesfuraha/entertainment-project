import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntertainmentRoutingModule } from './entertainment-routing.module';
import { EntertainmentComponent } from './entertainment.component';
import { MoviesComponent } from './movies/movies.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    EntertainmentComponent,
    MoviesComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    EntertainmentRoutingModule
  ]
})
export class EntertainmentModule { }
