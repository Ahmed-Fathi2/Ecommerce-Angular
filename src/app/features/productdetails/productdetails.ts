import { Component, effect, inject, Input, input, OnInit, signal } from '@angular/core';
import { Productservice } from '../../core/services/product/productservice';
import { ErrorHandlerService } from '../../core/services/ErrorHandlerService/error-handler-service';
import { IProductDetails } from '../../core/models/product/IProductDetails';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [RouterLink],
  templateUrl: './productdetails.html',
  styleUrl: './productdetails.css',
})
export class Productdetails implements OnInit {
  private productService = inject(Productservice);

  // can use ActivatedRoute to get the product id from the route params, but here we are using @Input() to get the product id from the parent component
  // must activate   provideRouter(****,withComponentInputBinding()), in app.config.ts
  // == @Input id ! : string  || @Input id this is a prop but input<> is a signal
  id = input.required<string>();

  product = signal<IProductDetails | null>(null);
  isLoading = signal<boolean>(true);

  isErrorExists = signal<boolean>(false);

  constructor() {
    // effect(() => {
    //   this.loadProduct(this.id());
    // });
  }

  ngOnInit(): void {
    this.loadProduct(this.id());
  }

  private loadProduct(ProductId: string) {
    this.productService.GetProductDetails(ProductId).subscribe({
      next: (response) => {
        this.product.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.isErrorExists.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
