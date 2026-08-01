import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner/spinner-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withInterceptors([headerInterceptor,errorInterceptor,spinnerInterceptor])),
 

  ],
};
