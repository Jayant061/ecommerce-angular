import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../product.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  private productService = inject(ProductsService);

  form = new FormGroup({
    gender: new FormControl<string>(" "),
    category:new FormControl<string>(" ")
  })

  constructor(){
    this.form.valueChanges.subscribe({next:(val)=>{
        this.productService.setFilter(val.gender?val.gender:"",val.category?val.category:"")
    }})

  }
  handleClearFilter(){
    this.form.reset();
  }
}
