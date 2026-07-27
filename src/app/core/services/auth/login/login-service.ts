import { HttpClient } from '@angular/common/http';
import {  inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn:'root'
})
export class LoginService {


    userData = signal<any>(null);


private platformId = inject(PLATFORM_ID);

constructor(private httpClient:HttpClient){}

login(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/Auth`,data);
}

getUserData() {
  if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    
    if (token) {
      try 
      {
        this.userData.set(jwtDecode(token));

        console.log('Decoded user data:', this.userData());
      }
      catch (error)
     {
        console.error('Invalid token, clearing storage:', error);
        localStorage.removeItem('token');
        return null;
      }
    }
    else {
        this.userData.set(null);
    }
  }
  
  return null;
}
}
