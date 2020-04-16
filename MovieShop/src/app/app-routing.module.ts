import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { CartComponent } from '../app/cart/cart.component';
import {MovieDetailsComponent} from '../app/movie-details/movie-details.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';

const routes:Routes =[
  {path:'cart',component:CartComponent},
  {path:'detail/:imdbID',component:MovieDetailsComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
