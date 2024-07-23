import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../products/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css','./navbar-responsive.component.css']
})
export class NavbarComponent {
private cartservice = inject(CartService);
private productService = inject(ProductsService);
private router = inject(Router)
query = signal<string>("");
constructor(){
  effect((onCleanup)=>{
    
    this.query();
    const time = setTimeout(()=>{
      this.productService.setQuery(this.query());
      this.productService.setCategoryFilter('');
      this.productService.setGenderFilter('');
      this.query().length && this.router.navigate(["all-products"])
    },700);
    onCleanup(()=>clearTimeout(time));
  })
}
 get searchIcon(){
  return "../../../assets/" + "material-symbols--search.png";
 }
 get getCartIcon(){
  return "../../../assets/cart-white.png";
 }
 get getUserIcon(){
  return "../../../assets/user.png"
 }
 handleNavigateToCart(){
  this.router.navigate(["/viewcart"]);
 }
 handleNavigateToUser(){
  this.router.navigate(['auth/user'])
 }
 onClick(){
  this.router.navigate(["/"])
 }
 cartCount = this.cartservice.getTotalQty;
}
