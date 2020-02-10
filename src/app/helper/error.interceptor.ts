import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EndpointsConstant } from './../services/endpoints.constant';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class ErrorInterceptor implements HttpInterceptor {

    private static accessTokenError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status === 401) {

                if (!ErrorInterceptor.accessTokenError$.getValue()) {

                    ErrorInterceptor.accessTokenError$.next(true);

                    const body = {
                        refresh_token: localStorage.getItem('refresh_token'),
                        email: localStorage.getItem('email')
                    };

                    const url = environment.apiURL + EndpointsConstant.AUTH_TOKEN;

                    // Call API and get a New Access Token
                    return this.httpClient.post(url, body).pipe(
                        switchMap((event: any) => {
                            // Save new Tokens
                            localStorage.setItem('access_token', event.access_token);
                            localStorage.setItem('refresh_token', event.refresh_token);

                            ErrorInterceptor.accessTokenError$.next(false);
                            // Clone the request with new Access Token
                            const newRequest = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                }
                            });
                            return next.handle(newRequest);
                        }),
                        catchError(er => {
                            localStorage.clear();
                            location.reload(true);
                            return throwError(er);
                        })
                    );
                } else {

                    // If it's not the firt error, it has to wait until get the access/refresh token
                    return this.waitNewTokens().pipe(
                        switchMap((event: any) => {
                            // Clone the request with new Access Token
                            const newRequest = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                }
                            });
                            return next.handle(newRequest);
                        })
                    );
                }
            } else if (err.status === 403) {
                // Logout if 403 response - Refresh Token invalid
                localStorage.clear();
                location.reload(true);
            }

            const error = err.error.message || err.statusText;

            return throwError(error);
        }));
    }

    // Wait until get the new access/refresh token
    private waitNewTokens(): Observable<any> {
        const subject = new Subject<any>();
        const waitToken$: Subscription = ErrorInterceptor.accessTokenError$.subscribe((error: boolean) => {
            if(!error) {
                subject.next();
                waitToken$.unsubscribe();
            }
        });
        return subject.asObservable();
    }

}
