import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDescriptionComponent } from "./components/products/product-description/product-description.component";
import { AllProductsPageComponent } from "./components/products/all-products-page/all-products-page.component";
import { CartComponent } from "./components/cart/cart.component";

export const routes:Routes = [
    {
        path:"",
        component:HomeComponent
    }
    ,{
        path:"all-products",
        component:AllProductsPageComponent
    },{
        path:"products/:productId",
        component:ProductDescriptionComponent
    },
    {
        path:"viewcart",
        component:CartComponent
    }
]