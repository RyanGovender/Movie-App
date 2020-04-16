import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {Movie} from '../Movie'
import { MoviesService } from '../movies.service';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  item=[];
  total = 0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.item = this.cartService.getItems();
    this.total = this.cartService.total;
  }

  ngAfterContentChecked()
  {
    this.total = this.cartService.total;
  }

  removeItem(item:any) : void {
    this.cartService.removeItem(item);
  }

  clearCart():void{
 
    this.cartService.clearCart();
  }

  

}
