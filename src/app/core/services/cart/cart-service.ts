import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { ICart, ICartItem } from '../../models/cart/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/api/Cart`;

  private readonly platformId = inject(PLATFORM_ID);

  items = signal<ICartItem[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.loadCartCount();
      }
    }
  }
  cartItemsCount = signal<number>(0);

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    const token = localStorage.getItem('token');

    return this.httpClient.post(
      this.baseUrl,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  getCart(): Observable<ICart> {
    console.log(this.baseUrl);
    let token = '';

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.httpClient.get<ICart>(this.baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  updateCart(productId: string, quantity: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${productId}`, { quantity });
  }

  deleteFromCart(productId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(`${this.baseUrl}/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  loadCartCount(): void {
    this.getCart().subscribe({
      next: (response) => {
        const totalCount = response.items.reduce((total, item) => total + item.quantity, 0);
        this.cartItemsCount.set(totalCount);
      },
      error: () => {
        this.cartItemsCount.set(0);
      },
    });
  }
}
