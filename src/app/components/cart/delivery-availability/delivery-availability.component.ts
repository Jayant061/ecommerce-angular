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
handleSubmit(){
  if(this.pincode.length===6 && this.pincode>="100000"){
    this.cartService.setDeliveryCharge(this.pincode)
  }
  else{
    this.error = "Please Enter a valid pincode";
  }
}
get tickIcon(){
  return "../../../../assets/tick.png";
}
}
