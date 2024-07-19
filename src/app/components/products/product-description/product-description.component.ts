import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnChanges,
  signal,
} from '@angular/core';
import { ProductsService } from '../product.service';
import { emptyProduct, Product } from '../product.model';
import { ButtonComponent } from '../../shared/button/button.component';
import { CurrencyPipe } from '@angular/common';
import { TitleComponent } from '../../shared/title/title.component';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from '../products.component';
import { CartService } from '../../cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [
    ButtonComponent,
    CurrencyPipe,
    TitleComponent,
    LoadingSpinnerComponent,
    ProductComponent,
    ProductsComponent,
  ],
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css','./continued.css','./responsive.css'],
})
export class ProductDescriptionComponent implements OnChanges {
  private destroyRef = inject(DestroyRef);
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private router = inject(Router);
  productId = input.required<string>();
  isLoading = signal<boolean>(false);
  product = signal<Product>(emptyProduct);
  similarProducts = signal<Product[]>([])
  isAddedToCart = computed(() => {
    return this.cartService.isAddedToCart(this.product().id);
  });
  price = computed(() => {
    return Number(this.product()?.price) * 4;
  });
  get getStarIcon() {
    return '../../../../assets/star.png';
  }
  handleAddToCart() {
    this.cartService.addToCart(this.product());
  }
  handleGoToCart() {
    this.router.navigate(['viewcart']);
  }
  handleBuyNow(){
    this.handleAddToCart();
    this.handleGoToCart();
  }
  ngOnChanges() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.isLoading.set(true);
    const subs = this.productsService
      .getOneProductDetails(this.productId())
      .subscribe({
        next: (val) => {
          this.product.set(val);
          this.productsService.getSimilarProducts(this.product().category).subscribe({
            next: (val) => {
              this.similarProducts.set(filterProducts(val, this.productId()));
              this.isLoading.set(false);
            },
          });
        },
      });

    this.destroyRef.onDestroy(() => subs.unsubscribe());
  }
}
function filterProducts(arr: Product[], id: string) {
  const newArr = arr.filter((item) => {
    if (String(item.id) !== id) {
      return item;
    } else return;
  });
  return newArr;
}
