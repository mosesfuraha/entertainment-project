import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appConfig } from './app.config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,

    StoreModule.forRoot({}, {}),

    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),
  ],
  providers: [...appConfig.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
