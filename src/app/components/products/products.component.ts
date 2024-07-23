import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { ProductComponent } from "./product/product.component";

import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { TitleComponent } from '../shared/title/title.component';
import { Product } from './product.model';
import { FilterComponent } from "./filter/filter.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, LoadingSpinnerComponent, TitleComponent, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @Input({required:true}) allProducts:Product[] = [];
  isCorrectPathForFilterVisibility = window.location.pathname.includes('all-products');
  isFilterVisible:boolean = false;
  handleFilterVisibility(){
    this.isFilterVisible = !this.isFilterVisible;
  }
}
