import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageConstants } from '../constants/storage.constants';

export function mainInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  // Add authorization header with Token if available
  if (
    localStorage.getItem(StorageConstants.EMAIL) &&
    localStorage.getItem(StorageConstants.ACCESS_TOKEN)
  ) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(
          StorageConstants.ACCESS_TOKEN
        )}`,
      },
    });
  }

  return next(request);
}
