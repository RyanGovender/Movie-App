import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { CartComponent } from './cart/cart.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { HeroImageComponent } from './hero-image/hero-image.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    CartComponent,
    MovieDetailsComponent,
    NavbarComponent,
    DashboardComponent,
    MovieSearchComponent,
    HeroImageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      // HttpClientInMemoryWebApiModule.forRoot(
      //   InMemoryDataService, { dataEncapsulation: false },
      // ),
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
