import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification-service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let notificationService = inject(NotificationService);
  let message = '';

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // console.error('HTTP Error:', error);

      if (error.status === 0) {
        message = 'Unable to connect to the server';
      } else {
        message = getBackendErrorMessage(error);
        // console.log("=================Backend error message==================");
        // console.log('Backend error message:', message);
      }

      notificationService.error(message);
      return throwError(() => error);
    }),
  );
};

function getBackendErrorMessage(error: HttpErrorResponse): string {
  const body = error.error;
  if (!body) return 'An unexpected error occurred';

  if (body.errors) {
    const firstKey = Object.keys(body.errors)[0];
    console.log('First key in errors:', firstKey);
    if (firstKey && body.errors[firstKey]?.[0]) {
      console.log('First error message:', body.errors[firstKey][0]);
      return body.errors[firstKey][0];
    }
  }

  // for internal server error [Fathi]
  if (body.title) {
    console.log('Error title:', body.title);
    return body.title;
  }

  return 'An unexpected error occurred';
}
