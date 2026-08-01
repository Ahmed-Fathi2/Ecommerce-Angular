import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private platformId = inject(PLATFORM_ID);

  private readonly notyf?:Notyf;

  constructor(){

    if(isPlatformBrowser(this.platformId)){

        this.notyf= new Notyf({
            duration: 3500,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true,
            ripple: true,
        });
    }

}
  


success(message: string) {
    
    if (this.notyf) {
      this.notyf.success(message);
    }
  }

  error(message: string) {
    if (this.notyf) {
      this.notyf.error(message);
    }
  }

}
