import { HttpClient } from "@angular/common/http";
import { computed, DestroyRef, effect, inject, Injectable, signal } from "@angular/core";
import { Product } from "./product.model";
import { baseURL } from "../../../../app.credential";

@Injectable({
    providedIn:"root"
})
export class ProductsService{
    private query = signal<string>("");
    getQuery = this.query.asReadonly()
    httpClient = inject(HttpClient);
    fetchProducts(){
        return this.httpClient.get<Product[]>(`${baseURL}/products`)
    }
    getOneProductDetails(id:string){
        return this.httpClient.get<Product>(`${baseURL}/products/${id}`)
    }
    getSimilarProducts(category:string){
        return this.httpClient.get<Product[]>(`${baseURL}/products/category/${category}`);
    }
    setQuery(query:string){
        this.query.set(query);
    }
    filter = signal<{gender:string,category:string}>({gender:"",category:""});
    setFilter(gender:string = "",category:string = ""){
        this.filter.set({gender,category});
    }
}