import { computed, Injectable, signal } from "@angular/core";
import { emptyProduct, Product } from "../products/product.model";

@Injectable({providedIn:"root"})
export class CartService{
    cartItems = signal<{product:Product,qty:number}[]>([]);
    deliveryCharge = signal<number>(30);
    
    addToCart(product:Product){
        const carts = this.cartItems();
        const result = carts.some(cart=>cart.product.id === product.id);
        !result && this.cartItems.set([{product:product,qty:1},...carts]);
    }
    removeFromCart(product:Product){
        const carts = this.cartItems().filter(cartItem=>cartItem.product.id !==product.id);
        this.cartItems.set(carts);
        
    }
    incrementCartQty(product:Product){
        const carts = this.cartItems().map(cartItem=>{
            if(cartItem.product.id === product.id){
                return {...cartItem,qty:cartItem.qty+1}
            }
            else{
                return cartItem
            }
        })
        this.cartItems.set(carts);
    }
    decrementCartQty(product:Product){
        const carts = this.cartItems().map(cartItem=>{
            if(cartItem.product.id === product.id){
                if(cartItem.qty>1){
                    return {...cartItem,qty:cartItem.qty-1}
                }else{
                    return cartItem;
                }
            }
            else{
                return cartItem
            }
        });
        this.cartItems.set(carts);
    }
    isAddedToCart(id:string){
        const cartItem = this.cartItems().find(item=>item.product.id === id);
        if(cartItem?.qty){
            return true;
        }
        else{
            return false;
        }
    }
    getTotalQty = computed(()=>{
        let count = 0;
        this.cartItems().map(cartItem=>{
            count += cartItem.qty
        })
        return count;
    });
    getSubtotal= computed(()=>{
        let cost = 0;
        this.cartItems().forEach(item=>{
            cost += Number(item.product.price)*item.qty
        });
        return cost;
    })
    getDiscount = computed(()=>{
        if(this.getSubtotal() >500){
            return 0.1*this.getSubtotal();
        }
        return 0;
    })
    setDeliveryCharge(pincode:string){
        if(pincode>="1000000" && pincode<"300000"){
            this.deliveryCharge.set(0);
            return 0;
        }else if(pincode>="3000000" && pincode<"600000"){
            this.deliveryCharge.set(40);
            return 40;
        }
        else{
            this.deliveryCharge.set(50);
            return 50;
        }
    }
    getTotalPayable = computed(()=>{
        return this.getSubtotal() + this.deliveryCharge() - this.getDiscount();
    })

    
}