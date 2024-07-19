import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { ProductComponent } from "./product/product.component";

import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading-spinner.component";
import { TitleComponent } from '../shared/title/title.component';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, LoadingSpinnerComponent,TitleComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  @Input({required:true}) allProducts:Product[] = [];
}
