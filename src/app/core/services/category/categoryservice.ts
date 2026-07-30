import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriesResponse } from '../../models/category/ICategory';

@Injectable({
  providedIn: 'root'
})
export class Categoryservice {

  private httpClient = inject(HttpClient);

  GetAllCategoryForSlider(pageSize: number): Observable<CategoriesResponse> {
    return this.httpClient.get<CategoriesResponse>(`${environment.baseUrl}/api/Categories?PageSize=${pageSize}`);
  }
}

