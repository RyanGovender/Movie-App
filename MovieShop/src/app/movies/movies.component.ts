import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {MoviesService} from '../movies.service';
import { Movie } from '../Movie';
import { CartService } from '../cart.service';
import {MovieDetailsComponent} from '../movie-details/movie-details.component';
import { Title } from '@angular/platform-browser';
import { Observable, Subject,of, combineLatest, BehaviorSubject } from 'rxjs';
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


  brews:MultipleMovies[];
  _flag = false;
  searchBox:string;
  _defaultSearch = 'batman';
  count =0;
  _currentSearch = undefined;
  search$:string;

  results :Object;
  _defaultTerm = new BehaviorSubject(this._defaultSearch);
  searchTerm$ = new BehaviorSubject(this._defaultSearch);

  constructor(private movieService:MoviesService,private cartService:CartService, private cd:ChangeDetectorRef) {
 
  } 
  ngOnInit(): void {
      //this.searchMovie(this.searchTerm$);
        this.movieService.searchEntries(this.searchTerm$)
        .subscribe((results:any) => {
          this.results = results.Search;
          this.count =0;
          if(this.results!= undefined) this.count = Object.keys(this.results).length
          this.searchBox = this.searchTerm$.getValue();
        });
  }

  searchMovie(value)
  {
      this.searchBox = value;
      this.searchBox==null || !this._flag || this.searchBox ==''?
      this.movieSearch(this._defaultSearch):
      this.movieSearch(value);
      this._flag = true;
  }

  private movieSearch(value)
  {
    if(value.length>=3)
    {
      this.count =0;
      this._currentSearch = value;
      this.movieService.searchEntries(value).pipe(debounceTime(500),distinctUntilChanged()).subscribe((data:any)=>{
           this.brews = data.Search;
           this.brews!=undefined ? this.count = this.brews.length:this.count =0;
      });
    }
  }

  addToCart(movie:any,numberOfTickets:number):void{
    this.cartService.addToCart(movie,numberOfTickets,50);
  }

  onSelect(hero: Movie): void { 
    this.selectedMovie = hero;
  }
}
