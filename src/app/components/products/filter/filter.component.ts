import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../product.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  private productService = inject(ProductsService);
  gender = signal<string>("");
  category = signal<string>("");

  constructor(){
    effect(()=>{
      this.productService.setCategoryFilter(this.category())
      this.productService.setGenderFilter(this.gender())
    },{allowSignalWrites:true})
  }
}
