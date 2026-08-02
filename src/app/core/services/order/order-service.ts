import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OrderDetailsResponse, UserOrderResponse } from '../../models/order/IOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);

  private readonly baseUrl = `${environment.baseUrl}/api/Orders`;

  placeOrder(): Observable<any> {
    return this.httpClient.post(this.baseUrl,{});
  }

  getOrders(): Observable<UserOrderResponse[]> {
    return this.httpClient.get<UserOrderResponse[]>(this.baseUrl);
  }

  getOrderDetails(orderId: string): Observable<OrderDetailsResponse> {
    return this.httpClient.get<OrderDetailsResponse>(`${this.baseUrl}/${orderId}`);
  }
}
