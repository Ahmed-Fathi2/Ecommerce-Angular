import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../models/product/IProduct';
import { environment } from '../../../../environments/environment';
import { IProductDetails } from '../../models/product/IProductDetails';

@Injectable({
  providedIn: 'root'
})
export class Productservice {

  private httpClient = inject(HttpClient)

  GetAllProductsForSlider(pageSize: number): Observable<ProductsResponse> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/Product?PageSize=${pageSize}`);
  }

  GetProductDetails(id: string|null): Observable<IProductDetails> {

    return this.httpClient.get<IProductDetails>(`${environment.baseUrl}/api/Product/${id}`)

  }
}

