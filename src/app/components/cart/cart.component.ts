import { Component, computed, inject } from '@angular/core';
import { DeliveryAvailabilityComponent } from "./delivery-availability/delivery-availability.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DeliveryAvailabilityComponent, OrderSummaryComponent,CartItemComponent,ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  cartItems = computed(()=>{
    return this.cartService.cartItems();
  });
  private router = inject(Router);
  handleNavigate(){
    this.router.navigate(["all-products"]);
  }

}
