import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../Movie';
import { IMovie } from '../IMovie';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie : IMovie;
  //movieDetail:Movie;
  movie2:IMovie;
  //movies: IMovie[];

  errorMessage:string;
  constructor( private route: ActivatedRoute,
    private movieService:MoviesService
    ) { }

  ngOnInit(): void {
    this.get();
  }

  get():Boolean
  {
    const title2 = this.route.snapshot.paramMap.get('imdbID');;
    this.movieService.getMovieData(title2).subscribe(movieData =>{
      this.movie2 = movieData;
      console.log('getMovieDetails:' + this.movie2.Plot);
    },
    error => this.errorMessage = <any>error);
    return false;
  }

}
