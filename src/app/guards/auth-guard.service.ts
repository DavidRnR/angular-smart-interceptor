import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('email') && localStorage.getItem('refresh_token') && localStorage.getItem('access_token')) {
        return true;
    }

    // Redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
