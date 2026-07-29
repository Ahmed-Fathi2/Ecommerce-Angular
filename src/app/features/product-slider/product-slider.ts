import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Productservice } from '../../core/services/product/productservice';
import { IProduct } from '../../core/models/product/IProduct';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { ErrorHandlerService } from '../../core/services/ErrorHandlerService/error-handler-service';

@Component({
  selector: 'app-product-slider',
  imports: [ProductCard, CommonModule],
  templateUrl: './product-slider.html',
  styleUrl: './product-slider.css',
})
export class ProductSlider implements OnInit {
  private productService = inject(Productservice);

  private errorHandlerService = inject(ErrorHandlerService);

  products = signal<IProduct[]>([]);
  currentIndex = signal<number>(0);
  isLoading = signal<boolean>(true);
  itemsPerPage = 3;
  pageNumber = 10;

  errorMessages = signal<string []>([]);

 


  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.GetAllProductsForSlider(this.pageNumber).subscribe({
      next: (response: any) => {
        const rawItems = response?.items || response;
        this.products.set(Array.isArray(rawItems) ? rawItems : []);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching products:', error);


        this.isLoading.set(false);

        this.errorMessages.set(this.errorHandlerService.extractServerErrors(error));
      }
    });
  }

  maxIndex = computed(() => Math.max(0, this.products().length - this.itemsPerPage));

  transformStyle = computed(() => {
    const percentage = this.currentIndex() * (100 / this.itemsPerPage + 1);
    return `translateX(-${percentage}%)`;
  });

  nextSlide(): void {
    if (this.currentIndex() < this.maxIndex()) {
      this.currentIndex.update(val => val + 1);
    }
  }

  prevSlide(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(val => val - 1);
    }
  }
}