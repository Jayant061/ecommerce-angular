import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, signinData } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  form = new FormGroup({
    email: new FormControl(" ",{validators:[Validators.email,Validators.required]}),
    password: new FormControl('',{validators:[Validators.minLength(6),Validators.required]})
  },{validators:[]});
  signinError = "";
  handleSubmit(){
    this.signinError = "";
    const user:signinData = this.form.value as signinData
    const res = this.authService.signin(user);
    console.log(res);
    if(res === 401){
      this.signinError = "Incorrect email or password"
    }else if(res === 404){
      this.signinError = "No user with this email found. Please check you email or create an account."
    }else{
      this.signinError = "";
      this.router.navigate(["auth/user"])
    }
  }

  invalidEmailError = "";
  handleEmailChange(){
      const {dirty,invalid} = this.form.controls.email;
      if(dirty && invalid){
        this.invalidEmailError = "Please enter a valid email"
      }
      else{
        this.invalidEmailError = "";
      }
  }

  invalidPasswordError = "";
  handlePasswordChange(){
    const {dirty,invalid} = this.form.controls.password;
    if(dirty && invalid){
      this.invalidPasswordError = "Password must be alteast 6 digits long"
    }
    else{
      this.invalidPasswordError = "";
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

  handleNavigateRegister(){
    this.router.navigate(['auth/register'])
  }


}
