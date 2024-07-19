import { Component, inject } from '@angular/core';
import fileData from "../../homepage.json";
import { CardsComponent } from "./cards/cards.component";
import { TrendingProductsComponent } from './trending-products/trending-products.component';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardsComponent,TrendingProductsComponent,ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./home-responsive.component.css']
})
export class HomeComponent {
  homepageData =  fileData
  private router = inject(Router);
  onClick(){
    this.router.navigate(["/all-products"]);
  }
}
