import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { map } from "rxjs";
import { Product } from "../../products/product.model";

@Injectable({
    providedIn:'root',
})
export class TrendingProductService {
    private httpClient = inject(HttpClient);

    // private trendingProducts = signal([]);

    // getTrendingroducts = this.trendingProducts.asReadonly();

    getTrendingProducts(){

        return this.httpClient.get<Product[]>("https://fakestoreapi.com/products?limit=3")
        // .pipe(map((val)=>{
        //     const newVal = val.map(val=>val.price = String(Number(val.price)*80));
        //     return newVal;
        // }))
    }

}