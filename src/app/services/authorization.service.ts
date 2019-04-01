import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { EndpointsConstant } from './endpoints.constant';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(public apiService: ApiService, private router: Router) {
  }

  login(email: string, password: string): Observable<any> {
    // Empty Local Storage
    localStorage.clear();
    const subject = new Subject();

    const body = {
      email,
      password
    };

    this.apiService.httpPost(EndpointsConstant.AUTH_SIGNIN, body).subscribe((tokenResponse: TokenResponse) => {
      // Save Tokens and User in Local Storage
      localStorage.setItem('access_token', tokenResponse.access_token);
      localStorage.setItem('refresh_token', tokenResponse.refresh_token);
      localStorage.setItem('email', email);
      subject.next();
    }, (err) => {
      console.error(err);
      subject.error(err);
    }, () => {
      subject.complete();
    });

    return subject.asObservable();
  }

  logout() {

    // Empty Local Storage
    localStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);

  }

}
