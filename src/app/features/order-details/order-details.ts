import { Component, inject, input, OnInit, signal } from '@angular/core';
import { OrderService } from '../../core/services/order/order-service';
import { OrderDetailsResponse } from '../../core/models/order/IOrder';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
  private orderService = inject(OrderService);
  id = input.required<string>();

  userOrderDetails = signal<OrderDetailsResponse | null>(null);

  ngOnInit(): void {
    this.orderService.getOrderDetails(this.id()).subscribe({
      next: (response) => {
        console.log(response);
        this.userOrderDetails.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
