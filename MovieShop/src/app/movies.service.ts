import { Injectable } from '@angular/core';
import {Movie} from './Movie';
import { Observable,of, BehaviorSubject} from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IMovie } from './IMovie';
import {MovieJson} from './MovieJson';
import { map, filter, switchMap } from 'rxjs/operators'
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import 'rxjs/add/operator/do'
import { MovieDb } from './MovieDb';
import {
  debounceTime, distinctUntilChanged
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movie:MovieDb[];
  result :any =[]
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  };

  private _siteURL = 'https://www.omdbapi.com/?t=';
  private _param = '&apikey=';
  private _key = '9ad5a19c';

  constructor(
    private http: HttpClient) { }


 getMovieData(id): Observable<IMovie> {

      return this.http.get<IMovie>('https://www.omdbapi.com/?i=' + id 
        + this._param + this._key);
    }

    searchEntries(terms:BehaviorSubject<string>)
    {
      return terms.pipe(debounceTime(500),distinctUntilChanged(),
      switchMap(term => this.SeachAPIForMovieByTitle(terms.getValue())
      ));
    }
    
SeachAPIForMovieByTitle(value:string){

  if(value=='') value ='batman';
  if(value.length >=3) return this.http.get(`https://www.omdbapi.com/?s=${value}${this._param}${this._key}`);
}

}

