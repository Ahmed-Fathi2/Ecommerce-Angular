import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';
import { ICartItem } from '../../core/models/cart/ICart';
import { ErrorHandlerService } from '../../core/services/ErrorHandlerService/error-handler-service';
import { CartItem } from '../../shared/components/cart-item/cart-item';

@Component({
  selector: 'app-cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  private errorHandlerService = inject(ErrorHandlerService);

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
}
