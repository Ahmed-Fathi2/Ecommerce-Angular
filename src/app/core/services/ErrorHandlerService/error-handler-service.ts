import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  extractServerErrors(err: any): string[] {
    if (!err) {
      return [];
    }

    // Handle Network / Client-side error (request not sent, connection refused, CORS, backend down, status 0)
    if (err.status === 0) {
      if (typeof err.error === 'string' && err.error.trim()) {
        return [err.error];
      }
      if (err.error?.message && typeof err.error.message === 'string') {
        return [err.error.message];
      }
      if (err.message && typeof err.message === 'string') {
        return [err.message];
      }
      return ['Network error: Unable to connect to the server.'];
    }

    // Handle JavaScript Error instance passed directly
    if (err instanceof Error) {
      return [err.message];
    }

    const errorObj = err?.error ?? err;

    // Handle direct string error response
    if (typeof errorObj === 'string' && errorObj.trim()) {
      return [errorObj];
    }

    // Handle array error response
    if (Array.isArray(errorObj)) {
      return errorObj
        .map((e) => (typeof e === 'string' ? e : e?.message || e?.description))
        .filter((msg): msg is string => Boolean(msg && typeof msg === 'string'));
    }

    // Handle object error response
    if (typeof errorObj === 'object' && errorObj !== null) {
      const errors = errorObj.errors;

      if (errors) {
        if (Array.isArray(errors)) {
          return errors.filter((msg): msg is string => typeof msg === 'string');
        }

        if (typeof errors === 'object' && errors !== null) {
          const extracted = Object.values(errors).flatMap((messages) => {
            if (Array.isArray(messages)) {
              return messages.filter((message): message is string => typeof message === 'string');
            }
            if (typeof messages === 'string') {
              return [messages];
            }
            return [];
          });

          if (extracted.length > 0) {
            return extracted;
          }
        }
      }

      if (typeof errorObj.message === 'string' && errorObj.message.trim()) {
        return [errorObj.message];
      }

      if (typeof errorObj.title === 'string' && errorObj.title.trim()) {
        return [errorObj.title];
      }

      if (typeof errorObj.detail === 'string' && errorObj.detail.trim()) {
        return [errorObj.detail];
      }
    }

    if (err.statusText && err.statusText !== 'Unknown Error') {
      return [`Error ${err.status}: ${err.statusText}`];
    }

    return [];
  }

}
