import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Categoryservice } from '../../core/services/category/categoryservice';
import { ErrorHandlerService } from '../../core/services/ErrorHandlerService/error-handler-service';
import { ICategory } from '../../core/models/category/ICategory';
import { CategoryCard } from '../../shared/components/category-card/category-card';

@Component({
  selector: 'app-categoryslider',
  imports: [CommonModule, CategoryCard],
  templateUrl: './categoryslider.html',
  styleUrl: './categoryslider.css',
})
export class Categoryslider implements OnInit {
  private catergoryService = inject(Categoryservice);
  private errorHandlerService = inject(ErrorHandlerService);

  categories = signal<ICategory[]>([]);
  currentIndex = signal<number>(0);
  isLoading = signal<boolean>(true);
  errorMessages = signal<string[]>([]);
  itemsPerPage = 4;
  pageNumber = 10;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.catergoryService.GetAllCategoryForSlider(this.pageNumber).subscribe({
      next: (response) => {

        this.categories.set(response.items);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessages.set(this.errorHandlerService.extractServerErrors(error));
      },
    });
  }

  maxIndex = computed(() => Math.max(0, this.categories().length - this.itemsPerPage));

  transformStyle = computed(() => {
    const percentage = this.currentIndex() * (100 / this.itemsPerPage + 1);
    return `translateX(-${percentage}%)`;
  });

  nextSlide(): void {
    if (this.currentIndex() < this.maxIndex()) {
      this.currentIndex.update((val) => val + 1);
    }
  }

  prevSlide(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((val) => val - 1);
    }
  }
}


