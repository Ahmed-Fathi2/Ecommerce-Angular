import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../core/models/product/IProduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private cartService = inject(CartService);

  @Input() product!: IProduct;

  readonly defaultImage =
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

  get imageSrc(): string {
    return this.product.imageUrl || this.defaultImage;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImage;
  }
  onAddToCart() {
    console.log('sending request to add to cart\n\n\n');
    this.cartService.addToCart(this.product.id).subscribe({
      next: (response) => {
        console.log(response);
        scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
