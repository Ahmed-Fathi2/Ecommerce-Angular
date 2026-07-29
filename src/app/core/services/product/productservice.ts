import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../../models/product/IProduct';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Productservice {

constructor(private httpClient:HttpClient) { }

    GetAllProductsForSlider(pageSize: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}/api/Product?PageSize=${pageSize}`);
    }
}

