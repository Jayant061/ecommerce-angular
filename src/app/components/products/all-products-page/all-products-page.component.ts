import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../product.service';
import { ProductsComponent } from "../products.component";
import { TitleComponent } from '../../shared/title/title.component';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
@Component({
  selector: 'app-all-products-page',
  standalone: true,
  imports: [ProductsComponent, TitleComponent, LoadingSpinnerComponent],
  templateUrl: './all-products-page.component.html',
  styleUrl: './all-products-page.component.css'
})
export class AllProductsPageComponent {
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);
  private allProducts = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

  query = computed(()=>this.productsService.getQuery());

  getAllProducts = computed(()=>{
    return this.allProducts()
    .filter(item=>item.title.toLowerCase().includes(this.query().toLowerCase()) ||
            item.category.toLowerCase().includes(this.query().toLowerCase()))
        })
  ngOnInit(): void {
      this.isLoading.set(true);
      const subs = this.productsService.fetchProducts().subscribe({
        next:(val)=>{
          this.allProducts.set(val);
          this.isLoading.set(false)}
      });
      this.destroyRef.onDestroy(()=>subs.unsubscribe());
  }
}
