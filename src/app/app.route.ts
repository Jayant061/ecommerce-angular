import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDescriptionComponent } from "./components/products/product-description/product-description.component";
import { AllProductsPageComponent } from "./components/products/all-products-page/all-products-page.component";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { UserComponent } from "./components/auth/user/user.component";
import { AuthGuard } from "./components/shared/auth/auth.guard";

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
    },{
        path:"auth/login",
        component:LoginComponent
    },{
        path:"auth/register",
        component:RegisterComponent
    },
    {
        path:"auth/user",
        component:UserComponent,
        canActivate:[AuthGuard]
    }
]