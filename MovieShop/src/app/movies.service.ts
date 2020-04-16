import { Injectable } from '@angular/core';
import {Movie} from './Movie';
import { Observable,of} from "rxjs";
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



    getMovieData(movieName): Observable<IMovie> {

      return this.http.get<IMovie>(this._siteURL + movieName 
        + this._param + this._key).do(data => console.log('All: ' + JSON.stringify(data)));
    }
    
   

    getAllMovies():Observable<MovieDb[]>{
      var title= 'batman';
       console.log(title);
       return this.http.get<MovieDb[]>(`https://www.omdbapi.com/?s=${title}${this._param}${this._key}`)
       .do(data => console.log('All: ' + JSON.stringify(data)));
    }

    TestTry(){
      var title= 'batman';
      return this.http.get(`https://www.omdbapi.com/?s=${title}${this._param}${this._key}`);
    }

    private moviesUrl = 'api/movies';  // URL to web api


getMovies (): Observable<Movie[]> {
  return this.http.get<Movie[]>(this.moviesUrl)
}

getMovie(id:number):Observable<Movie>{
  const url= `${this.moviesUrl}/${id}`;
  return this.http.get<Movie>(url);
}

SeachAPIForMovieByTitle(value){
  return this.http.get(`https://www.omdbapi.com/?s=${value}${this._param}${this._key}`);
}

searchMovies(term:string):Observable<MovieDb[]>{
  // if(!term.trim())
  // {
  //   return of([]);
  // }
  console.log('fuck');
  console.log(this.http.get<MovieDb[]>(`https://www.omdbapi.com/?s=${term}${this._param}${this._key}`));
  return this.http.get<MovieDb[]>(`http://www.omdbapi.com/?s=${term}${this._param}${this._key}`);
}


getMovieByTitle():Observable<IMovie[]>{

  var title = 'Baby+Driver';
  const url = `https://www.omdbapi.com/?apikey=9ad5a19c&t=${title}`;
  return this.http.get<IMovie[]>(url,this.httpOptions);
  
}

getApi(title:string):Observable<IMovie[]>{


    title ='Baby+Driver'; 
    const url = `https://www.omdbapi.com/?t=${title}&apikey=9ad5a19c`;
    const headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('token','token');
    let options = {headers:headers};
    return this.http.get<IMovie[]>(url,this.httpOptions);//.pipe(map((response: any) => response.json()));
}

adapt(mapper:any,json:any):any {

  let adaptedObj: any ={};
  const fields: Array<string>= Object.keys(mapper);
  for(let field of fields)
  {
    const targetField:any = mapper[field];
    adaptedObj[targetField] = json[field];
  }
  
  return adaptedObj;
  
  }

  EntryFormAdapter(json:MovieJson): IMovie {

    const mapper = {
      'Title':'json.Title',
      'Year': 'json.Year',
      'Rated':'json.Rated',
      'Released':'json.Released',
      'Runtime':'json.Runtime',
      'Genre' : 'json.Genre',
      'Director':'json.Director',
      'Writer':'json.Writer',
       'Actors':'json.Actors',
       'Plot':'json.Plot',
       'Language':'json.Language',
       'Country':'json.Country',
       'Awards':'json.Awards',
       'Poster':'json.Poster',
       'Ratings':'json.Ratings',
       'Metascore':'json.Metascore',
       'imdbrating':'json.imdbrating',
       'imdbVotes':'json.imdbVotes',
       'imdbid':'json.imdbid',
       'Type':'json.Type',
       'DVD':'json.DVD',
       'BoxOffice':'json.BoxOffice',
       'Production':'json.Production',
        'Website':'json.Website',
        'Response':'json.Response'

    };
    return this.adapt(mapper,json);
  }

  getData():Observable<IMovie>{
    var title ='Baby+Driver'; 
    const url = `https://www.omdbapi.com/?t=${title}&apikey=9ad5a19c`;
    return this.http.get<IMovie>(url).pipe(map((json:MovieJson) => this.EntryFormAdapter(json)));
  }



}
