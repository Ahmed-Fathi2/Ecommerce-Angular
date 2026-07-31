import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/api/Cart`;

  private readonly platformId = inject(PLATFORM_ID);


  addToCart(productId: string, quantity: number = 1): Observable<any> {
    const token = localStorage.getItem('token');

    return this.httpClient.post(
      this.baseUrl,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  getCart(): Observable<any> {

    console.log(this.baseUrl)
    let token = '';
    
    
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.httpClient.get(this.baseUrl, { headers: { Authorization: `Bearer ${token}` } });
  }

  updateCart(productId: string, quantity: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${productId}`, { quantity });
  }

  deleteFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${productId}`);
  }
}
