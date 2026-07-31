import { Component, Input } from '@angular/core';
import { ICartItem } from '../../../core/models/cart/ICart';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input({ required: true }) item!: ICartItem;
}
