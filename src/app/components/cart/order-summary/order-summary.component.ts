import { Component, computed, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CurrencyPipe,ButtonComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent  {
private cartService = inject(CartService);
private router = inject(Router);

getTotalQty = computed(()=>{
  return this.cartService.getTotalQty();
})
totalSubtotal = computed(()=>{
  return this.cartService.getSubtotal();
})
discount = computed(()=>{
  return this.cartService.getDiscount();
});

deliveryCharge = computed(()=>{
  return  this.cartService.deliveryCharge();
})
totalPrice = computed(()=>{
  return this.cartService.getTotalPayable();
});

handleContinueShopping(){
  this.router.navigate(["all-products"]);
}
}
