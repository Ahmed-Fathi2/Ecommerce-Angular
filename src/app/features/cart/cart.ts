import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { ICartItem } from '../../core/models/cart/ICart';
import { ErrorHandlerService } from '../../core/services/ErrorHandlerService/error-handler-service';
import { CartItem } from '../../shared/components/cart-item/cart-item';
import { OrderService } from '../../core/services/order/order-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  private errorHandlerService = inject(ErrorHandlerService);

  private platformId = inject(PLATFORM_ID);

  // items = signal<ICartItem[]>([]);
  isLoading = signal<boolean>(true);
  errorMessages = signal<string[]>([]);

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.cartService.items.set(response.items);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessages.set(this.errorHandlerService.extractServerErrors(error));
      },
    });
  }

  proceedToCheckout() {
    this.orderService.placeOrder().subscribe({
      next: (response) => {
        console.log(response.sessionUrl);
        if (isPlatformBrowser(this.platformId)) {
          location.href = response.sessionUrl;
        }

        // this.cartService.items.set([]);
        // this.cartService.cartItemsCount.set(0);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
