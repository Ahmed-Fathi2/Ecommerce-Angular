import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

    extractServerErrors(err: any): string[] {
        const errors = err?.error?.errors;

        if (!errors || typeof errors !== 'object') {
            return [];
        }

        return Object.values(errors).flatMap((messages) => {
            if (Array.isArray(messages)) {
            return messages.filter((message): message is string => typeof message === 'string');
            }

            return [];
  });
}

}
