import { Component, inject } from '@angular/core';
import { AuthService, User } from '../auth.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonComponent, LoadingSpinnerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
private authService = inject(AuthService);
private router = inject(Router);
  user:User = this.authService.user() as User
  onSignOut(){
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
