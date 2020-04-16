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
    console.log(this.movie2+'.......................................');
  //  this.getMovie2();
  //   const title2 = this.route.snapshot.paramMap.get('title');
  //  fetch(`http://www.omdbapi.com/?s=${title2}&apikey=bb401528`)
  //  .then(response=>response.json())
  //  .then(res=>this.movies=res.Search);  
  }


 
  // getMovie():void{

  //   console.log('Hello');
  //   const id =+this.route.snapshot.paramMap.get('id');
  //   this.movieService.getMovie(id).subscribe(movie=>this.movie = movie);
   
  // }
  getMovie2():void{
     const title = this.route.snapshot.paramMap.get('title');
     //this.movieService.getMovieByTitle().subscribe(movie=>this.movie2=movie);
  }

  get():Boolean
  {
    console.log('Useless Log');
    var movieTitle ='Baby+Driver';
    this.movieService.getMovieData(movieTitle).subscribe(movieData =>{
      this.movie2 = movieData;
      console.log('getMovieDetails:' + this.movie2.Plot);
    },
    error => this.errorMessage = <any>error);
    console.log(this.movie2.Language)
    return false;
  }

}
