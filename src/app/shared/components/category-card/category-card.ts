import { Component, Input } from '@angular/core';
import { ICategory } from '../../../core/models/category/ICategory';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCard {
  @Input() category!: ICategory;

  readonly defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80';

  get imageSrc(): string {
    return this.category?.imageUrl || this.defaultImage;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImage;
  }
}
