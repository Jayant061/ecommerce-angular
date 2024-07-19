import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  host:{
    "(click)":"onClick()"
  }
})
export class ProductComponent {
  private cartService = inject(CartService);
  isAddedToCart:boolean = false;
product = input.required<Product>();
cartImage = computed(()=>{
  if(this.cartService.isAddedToCart(this.product().id)){
    return "cart-fill-red.png"
  }
  return "cart-red.png"
})
get getImagePath(){
  return "../../../../assets/" +this.cartImage();
}
handleCart(event:Event){
  event.stopPropagation()
  this.cartService.addToCart(this.product());
  this.isAddedToCart = true;
}
private router = inject(Router);
onClick(){
  this.router.navigate(["/products",this.product().id])
}

}
