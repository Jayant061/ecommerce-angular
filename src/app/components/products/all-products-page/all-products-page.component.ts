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
  gender = computed(()=>this.productsService.gender());
  category = computed(()=>this.productsService.category());

  getAllProducts = computed(()=>{
    this.allProducts();
    return filterProducts(this.allProducts(),this.query(),this.gender(),this.category())
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

function filterProducts(arr:Product[],query:string,gender:string,category:string){
  const filterProducts:Product[] = []
  arr.forEach((product)=>{
    // checking if product title or description includes the query
    // incase of filters (gender) checking if the index of filter is 0 or previous char of filter is space
    if(query.toLocaleLowerCase() ==='men'){
      gender = !gender ? query : gender;
    }
    const isQueryAvailable:boolean = product.category.toLowerCase().includes(query.toLowerCase())||
          product.title.toLowerCase().includes(query.toLowerCase());
    const genderIndex:number = product.category.toLowerCase().indexOf(gender.toLowerCase());
    const isCategoryAvailable:boolean = product.category.toLowerCase().includes(category.toLowerCase())

    if(isQueryAvailable && isCategoryAvailable && (genderIndex===0 || product.category[ genderIndex-1] === ' ')){
      filterProducts.push(product);
    }
  });
  return filterProducts;
}
