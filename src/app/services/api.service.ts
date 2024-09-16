import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  httpGet<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiURL}${endpoint}`);
  }

  httpPost<T>(endpoint: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${environment.apiURL}${endpoint}`, body);
  }

  httpPut<T>(endpoint: string, body: any): Observable<T> {
    return this.httpClient.put<T>(`${environment.apiURL}${endpoint}`, body);
  }

  httpDelete<T>(endpoint: string): Observable<T> {
    return this.httpClient.delete<T>(`${environment.apiURL}${endpoint}`);
  }
}
