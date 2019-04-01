import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class MainInterceptor implements HttpInterceptor {

    constructor() {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Add authorization header with Token if available
        if (localStorage.getItem('email') && localStorage.getItem('access_token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });

        }
        return next.handle(request);
    }
}
