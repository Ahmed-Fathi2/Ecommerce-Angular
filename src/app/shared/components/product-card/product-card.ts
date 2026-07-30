import { Component, Input } from '@angular/core';
import { IProduct } from '../../../core/models/product/IProduct';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  @Input() product!: IProduct;

  readonly defaultImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

  get imageSrc(): string {
    return this.product.imageUrl || this.defaultImage;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImage;
  }
}
