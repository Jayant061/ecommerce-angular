import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";

@Injectable({providedIn:"root"}
)
export class AuthGuard implements CanActivate{
  private authService = inject(AuthService);
  private router = inject(Router);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean|Promise<boolean>|Observable<boolean>|UrlTree
   {
     const isAuth = !!this.authService.currentUser();
     if(isAuth)return true
     else return this.router.createUrlTree(['auth/login']);
  }
}
