import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsConstant } from './endpoints.constant';
import { StorageConstants } from '../constants/storage.constants';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private apiService = inject(ApiService);

  login(email: string, password: string): Observable<any> {
    // Empty Local Storage
    localStorage.clear();

    const body = {
      email,
      password,
    };

    return this.apiService
      .httpPost<TokenResponse>(EndpointsConstant.AUTH_SIGNIN, body)
      .pipe(
        tap((tokenResponse: TokenResponse) => {
          // Save Tokens and User in Local Storage
          localStorage.setItem(
            StorageConstants.ACCESS_TOKEN,
            tokenResponse.accessToken
          );
          localStorage.setItem(
            StorageConstants.REFRESH_TOKEN,
            tokenResponse.refreshToken
          );
          localStorage.setItem(StorageConstants.EMAIL, email);
        })
      );
  }

  logout() {
    // Empty Local Storage
    localStorage.clear();
    return true;
  }
}
