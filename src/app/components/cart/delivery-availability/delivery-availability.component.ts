import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-delivery-availability',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delivery-availability.component.html',
  styleUrl: './delivery-availability.component.css',
})
export class DeliveryAvailabilityComponent {
  private cartService = inject(CartService);
pincode = "";
error = ""
extraInfoVisible:boolean = false;
isFreeDelivery:boolean = false;
handleInputChange(){
  this.error = "";
  this.isFreeDelivery = false;
  this.extraInfoVisible = false
}
handleSubmit(){
  if(this.pincode.length === 6 && this.pincode>="100000"){
    const res = this.cartService.setDeliveryCharge(this.pincode);
    this.extraInfoVisible = true;
    if(res===0){
      this.isFreeDelivery = true;
    }
  }
  else{
    this.error = "Please Enter a valid pincode";
    this.extraInfoVisible = true
  }
}
get tickIcon(){
  return "../../../../assets/tick.png";
}
}
