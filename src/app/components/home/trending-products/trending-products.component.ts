import { Component, signal,computed, inject } from '@angular/core';
import { TrendingProductService } from './trendingProducts.service';
import { Product } from '../../products/product.model';
import { CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { TitleComponent } from '../../shared/title/title.component';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-trending-products',
  standalone: true,
  imports: [CurrencyPipe, ButtonComponent, TitleComponent, LoadingSpinnerComponent],
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.css','./trending-products-responsive.component.css']
})
export class TrendingProductsComponent {
  trendingProducts = signal<Product[]>([]);
  private trendingProductService = inject(TrendingProductService);
  private router = inject(Router);
private cartService = inject(CartService);
  onClick(event:Event,product:Product){
    event.stopPropagation();
    this.cartService.addToCart(product)
    this.router.navigate(["/viewcart"]);
  }
  ShowProduct(id:string){
    this.router.navigate(["/products",id]);
  }

  ngOnInit(){
    this.trendingProductService.getTrendingProducts().subscribe({
      next:(val)=>{this.trendingProducts.set(val);}
    }
    )
  }
}
