import { Component, OnInit, Input } from '@angular/core';
import {MoviesService} from '../movies.service';
import { Movie } from '../Movie';
import { CartService } from '../cart.service';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';
import { Title } from '@angular/platform-browser';
import { Observable, Subject,of, combineLatest } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, startWith, map
} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { MovieDb } from '../MovieDb';
import { IMovie } from '../IMovie';
import { MultipleMovies } from '../MutipleMovies';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  @Input() 
  movies: MovieDb[];
  price = 50;
  selectedMovie:Movie ={
    id:1,
    Title:'Test',
    url:'',
    price:0,
    description:''
  };
  
  movies2$:Observable<MovieDb[]>;
  filteredMovies$:Observable<MovieDb[]>;
  filter: FormControl;
  filter$:Observable<string>;
  errorMessage:string;
  terms:Promise<any>;
  response:string[];
  brews:MultipleMovies[];
  _flag = false;
  searchBox:string;
  _defaultSearch = 'batman';
  count =0;
  _currentSearch = undefined;

  constructor(private movieService:MoviesService,private cartService:CartService, ) {} 

      ngAfterContentChecked()
      {
       if(this._flag)
       {
      this.searchMovie(this.searchBox);
      this._flag = false;
      this.brews!=undefined ? this.count = this.brews.length:this.count =0;
       }
      }

  ngOnInit(): void {
    this.searchMovie(this._currentSearch);
  }

  searchMovie(value)
  {
    this.searchBox = value;
    this._flag = true;
    this.searchBox==null || this.searchBox == undefined || this.searchBox ==''?
    this.movieSearch(this._defaultSearch):
    this.movieSearch(value);
  }

  private movieSearch(value)
  {
       this.count =0;
       this._currentSearch = value;
       this.movieService.SeachAPIForMovieByTitle(value).pipe(debounceTime(300),distinctUntilChanged()).subscribe((data:any)=>{
            this.brews = data.Search;
            this.brews!=undefined ? this.count = this.brews.length:this.count =0;
       });
  }

  addToCart(movie:any,numberOfTickets:number):void{
    console.log(numberOfTickets);
    console.log(movie.Title);
    this.cartService.addToCart(movie,numberOfTickets,50);
  }

  onSelect(hero: Movie): void { 
    this.selectedMovie = hero;
  }
}
