import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import {Movie} from '../Movie';
import {MoviesService} from '../movies.service';
import { MovieDb } from '../MovieDb';
@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies$: Observable<MovieDb[]>;
  private searchTerm = new Subject<string>();

 

  search(term: string): void {
    this.searchTerm.next(term);
  }

  constructor(private movieService:MoviesService) { 

    
  }

  // ngOnInit(): void {
  //   this.movies$ = this.searchTerm.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((term:string)=>this.movieService.searchMovies(term)),
  //   );
  // }
}
