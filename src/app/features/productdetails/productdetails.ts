import { Component, effect, inject, Input, input, OnInit, signal } from '@angular/core';
import { Productservice } from '../../core/services/product/productservice';
import { ErrorHandlerService } from '../../core/services/ErrorHandlerService/error-handler-service';
import { IProductDetails } from '../../core/models/product/IProductDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.css',
})
export class Productdetails implements OnInit {
  private productService = inject(Productservice);
  private errorHandlerService = inject(ErrorHandlerService);

  // must activate   provideRouter(****,withComponentInputBinding()), in app.config.ts
  // == @Input id ! : string  || @Input id this is a prop but input<> is a signal
  id = input.required<string>();
  
  product = signal<IProductDetails | null>(null);
  isLoading = signal<boolean>(true);
  errorMessages = signal<string[]>([]);

  constructor() {
    effect(() => {
      this.loadProduct(this.id());
    });
  }

  ngOnInit(): void {
    this.loadProduct(this.id());
  }

  private loadProduct(ProductId: string) {
    this.productService.GetProductDetails(ProductId).subscribe({
      next: (response) => {
        console.log(response);

        console.log(Date.now() / 1000)
        this.product.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessages.set(this.errorHandlerService.extractServerErrors(error));
        this.isLoading.set(false);
      },
    });
  }
}
