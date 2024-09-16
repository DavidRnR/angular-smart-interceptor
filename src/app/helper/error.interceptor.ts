import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import {
  Observable,
  throwError,
  Subject,
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { EndpointsConstant } from './../services/endpoints.constant';
import { environment } from './../../environments/environment';
import { StorageConstants } from '../constants/storage.constants';

const accessTokenError$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);

export function errorInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const httpClient = inject(HttpClient);
  return next(request).pipe(
    catchError((err) => {
      if (err.status === 401) {
        if (!accessTokenError$.getValue()) {
          accessTokenError$.next(true);

          const body = {
            refreshToken: localStorage.getItem(StorageConstants.REFRESH_TOKEN),
            email: localStorage.getItem(StorageConstants.EMAIL),
          };

          const url = environment.apiURL + EndpointsConstant.AUTH_TOKEN;

          // Call API and get a New Access Token
          return httpClient.post(url, body).pipe(
            switchMap((event: any) => {
              // Save new Tokens
              localStorage.setItem(
                StorageConstants.ACCESS_TOKEN,
                event.accessToken
              );
              localStorage.setItem(
                StorageConstants.REFRESH_TOKEN,
                event.refreshToken
              );

              accessTokenError$.next(false);
              // Clone the request with new Access Token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem(
                    StorageConstants.ACCESS_TOKEN
                  )}`,
                },
              });
              return next(newRequest);
            }),
            catchError((er) => {
            //   localStorage.clear();
            //   location.reload();
              return throwError(er);
            })
          );
        } else {
          // If it's not the firt error, it has to wait until get the access/refresh token
          return waitNewTokens().pipe(
            switchMap((event: any) => {
              // Clone the request with new Access Token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem(
                    StorageConstants.ACCESS_TOKEN
                  )}`,
                },
              });
              return next(newRequest);
            })
          );
        }
      } else if (err.status === 403) {
        // Logout if 403 response - Refresh Token invalid
        // localStorage.clear();
        // location.reload();
      }

      const error = err.error.message || err.statusText;

      return throwError(error);
    })
  );
}

// Wait until get the new access/refresh token
function waitNewTokens(): Observable<any> {
  const subject = new Subject<void>();
  const waitToken$: Subscription = accessTokenError$.subscribe(
    (error: boolean) => {
      if (!error) {
        subject.next();
        waitToken$.unsubscribe();
      }
    }
  );
  return subject.asObservable();
}
