import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGaurdService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // return this.authService.verifyUser();
    const promise = this.authService.verifyUser();
    return promise.then(
      (data) => {
        return true;
      },
      (err) => {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
    );
  }
}
