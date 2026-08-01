import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        if (decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
           console.log('No valid token found. Redirecting to login.');
          return true;
        } else {
          console.warn('Token has expired!');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }

      localStorage.removeItem('token');
    }
   
    return router.createUrlTree(['/login']);
  }

  // return router.createUrlTree(['/login']);
  return true; // Allow navigation on the server side
};
