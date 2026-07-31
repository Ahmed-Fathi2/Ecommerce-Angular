import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (response) => {console.log(response)},
      error: (error) => {console.log(error)},
    });
  }
}
