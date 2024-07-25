import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  form = new FormGroup({
    name:new FormControl('',{validators:[Validators.required]}),
    email: new FormControl(" ",{validators:[Validators.email,Validators.required]}),
    password: new FormControl('',{validators:[Validators.minLength(6),Validators.required]}),
    phone: new FormControl('',{validators:[Validators.required,Validators.minLength(10),Validators.maxLength(10)]}),
    gender: new FormControl<"male"| "female"|'other'|''>('',{validators:[Validators.required]})
  },{validators:[]});
  signUpError = "";
  handleSubmit(){
    if(!this.form.invalid){
      const user:User = this.form.value as User
      user.email = user.email.toLowerCase();
      const res = this.authService.signup(user);
      if(res === 409){
        this.signUpError = "User already exists. Please Sign in"
      }else{
        this.signUpError = "";
        this.router.navigate(["auth/user"])
      }
      
    }
    else{
      this.signUpError = "Something went wrong";
    }
  }
  imagePath = "../../../../assets/eye.png"
  isPasswordVisible = false;
  showHidePassword(){
    if(this.isPasswordVisible){
      this.imagePath = "../../../../assets/eye.png"
    }else{
      this.imagePath = "../../../../assets/close-eye.png"
    }
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  handleNavigateLogin(){
    this.router.navigate(['auth/login'])
  }
}

