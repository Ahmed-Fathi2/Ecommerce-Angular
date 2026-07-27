import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    constructor(private httpClient: HttpClient) { }

    AddUser(user:any):Observable<any> {
       return this.httpClient.post(`${environment.baseUrl}/Auth/register`, user);
    }
}

