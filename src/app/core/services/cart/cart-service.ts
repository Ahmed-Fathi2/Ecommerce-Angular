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

    return this.httpClient.post(this.baseUrl,{ productId, quantity });
  }

  getCart(): Observable<ICart> {

    return this.httpClient.get<ICart>(this.baseUrl);
  }

  updateCart(productId: string, quantity: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${productId}`, { quantity });
  }

  deleteFromCart(productId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${productId}`)
    
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
