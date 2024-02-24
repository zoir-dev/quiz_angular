import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.authService.getToken();

    if (token && this.authService.decodedToken().roles.includes('ADMIN')) {
      return true;
    } else {
      Swal.fire({
        title: 'Siz admin emassiz!',
        text: 'Bu sahifaga faqat admin kira oladi!',
        icon: 'error',
        timer: 1500,
      });
      return false;
    }
  }
}
