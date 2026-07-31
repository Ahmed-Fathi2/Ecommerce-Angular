import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  userData = signal<any>(null);

  constructor() {
    this.getUserData(); // قراءة التوكن فوراً عند التحميل
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/Auth`, data);
  }

  getUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decoded: any = jwtDecode(token);

          const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();

          if (isExpired) {
            this.clearToken();
          } else {
            this.userData.set(decoded);
          }
        } catch (error) {
          console.error('Invalid token structure:', error);
          this.clearToken();
        }
      } else {
        this.userData.set(null);
      }
    }
  }

  private clearToken(): void {
    localStorage.removeItem('token');
    this.userData.set(null);
  }
}
