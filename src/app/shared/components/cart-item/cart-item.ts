import { Component, inject, Input } from '@angular/core';
import { ICartItem } from '../../../core/models/cart/ICart';
import { CartService } from '../../../core/services/cart/cart-service';
import { NotificationService } from '../../../core/services/notification/notification-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input({ required: true }) item!: ICartItem;

  private readonly notificationService = inject(NotificationService);
  private readonly cartService = inject(CartService);

  removeItem() {
    this.cartService
      .deleteFromCart(this.item.productId)
      .pipe(
        switchMap(() => this.cartService.getCart())
      )
      .subscribe({
        next: (response) => {
          this.cartService.items.set(response.items);
          this.cartService.cartItemsCount.update((v)=>v-this.item.quantity);
          this.notificationService.success('Product deleted successfully');
        },
        error: (error) => {
          console.error(error);
          this.notificationService.error('Failed to update cart after deletion');
        },
      });
  }
}