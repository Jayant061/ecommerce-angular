import { Component, computed, inject, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../products/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent  {
  private cartService = inject(CartService);
  @Input({required:true}) item!:{product:Product,qty:number}
  subtotal = 0;
  ngOnChanges(): void {
      this.subtotal = this.item.qty* Number(this.item.product.price)
  }
  handleIncrement(){
    this.cartService.incrementCartQty(this.item.product);
  }
  handleDecrement(){
    this.cartService.decrementCartQty(this.item.product);
  }
  handleDelete(){
    this.cartService.removeFromCart(this.item.product)
  }
  get image(){
    return "../../../assets/"+ this.item.product.image;
  }

}
