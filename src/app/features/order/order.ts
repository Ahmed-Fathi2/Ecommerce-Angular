import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../core/services/order/order-service';
import { UserOrderResponse } from '../../core/models/order/IOrder';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  private orderService = inject(OrderService);

  userOrders = signal<UserOrderResponse[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        console.log(response);
        this.userOrders.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
      },
    });
  }
}
