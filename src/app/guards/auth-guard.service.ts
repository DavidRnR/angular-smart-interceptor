import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageConstants } from '../constants/storage.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      localStorage.getItem(StorageConstants.EMAIL) &&
      localStorage.getItem(StorageConstants.ACCESS_TOKEN) &&
      localStorage.getItem(StorageConstants.REFRESH_TOKEN)
    ) {
      return true;
    }

    // Redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
