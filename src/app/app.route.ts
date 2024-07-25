import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./components/shared/auth/auth.guard";

export const routes:Routes = [
    {
        path:"",
        component:HomeComponent
    }
    ,{
        path:"all-products",
        // component:AllProductsPageComponent
        loadComponent:()=>import("./components/products/all-products-page/all-products-page.component").then((mod)=>mod.AllProductsPageComponent)
    },{
        path:"products/:productId",
        // component:ProductDescriptionComponent
        loadComponent:()=>import("./components/products/product-description/product-description.component")
        .then((mod)=>mod.ProductDescriptionComponent)
    },
    {
        path:"viewcart",
        // component:CartComponent
        loadComponent:()=>import("./components/cart/cart.component").then((mod)=>mod.CartComponent)
    },{
        path:"auth",
        loadComponent:()=>import("./components/auth/auth.component").then((module)=>module.AuthComponent),
        children:[
            {
                path:"login",
                loadComponent:()=>import("./components/auth/login/login.component").then((mod)=>mod.LoginComponent)
            },{
                path:"register",
                loadComponent:()=>import("./components/auth/register/register.component").then((mod)=>mod.RegisterComponent)
            },
            {
                path:"user",
                loadComponent:()=>import("./components/auth/user/user.component").then((mod)=>mod.UserComponent),
                canActivate:[AuthGuard]
            }
        ]
    }
]