import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const movies=[

      {id:1,title:'Baby Driver', url:'https://upload.wikimedia.org/wikipedia/en/8/8e/Baby_Driver_poster.jpg',price:50,description:''},
      {id:2,title:'Suicide Squad', url:'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Suicide_Squad_%28film%29_Poster.png/220px-Suicide_Squad_%28film%29_Poster.png',price:50,description:''},
      {id:3,title:'Bad Boys for Life', url:'https://upload.wikimedia.org/wikipedia/en/9/90/Bad_Boys_for_Life_poster.jpg',price:50,description:''},
      {id:4,title:'Batman Begins', url:'https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Batman_Begins_Poster.jpg/220px-Batman_Begins_Poster.jpg',price:50,description:''},
      {id:5,title:'Justice League', url:'https://upload.wikimedia.org/wikipedia/en/3/31/Justice_League_film_poster.jpg',price:50,description:''}
    ];

    return{movies};
  }

  constructor() { }
}
