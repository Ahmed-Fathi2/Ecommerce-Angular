import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler-service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle network errors (status 0 / Failed to fetch)', () => {
    const networkErr = {
      status: 0,
      statusText: 'Unknown Error',
      url: 'https://localhost:7000/Auth',
      ok: false,
      error: new TypeError('Failed to fetch'),
      message: 'Http failure response for https://localhost:7000/Auth: 0 undefined'
    };

    const result = service.extractServerErrors(networkErr);
    expect(result).toEqual(['Failed to fetch']);
  });

  it('should extract ASP.NET validation error messages', () => {
    const apiErr = {
      status: 400,
      error: {
        errors: {
          Email: ['Email is invalid'],
          Password: ['Password is required']
        }
      }
    };

    const result = service.extractServerErrors(apiErr);
    expect(result).toEqual(['Email is invalid', 'Password is required']);
  });

  it('should extract simple message from API error response', () => {
    const apiErr = {
      status: 401,
      error: { message: 'Invalid credentials' }
    };

    const result = service.extractServerErrors(apiErr);
    expect(result).toEqual(['Invalid credentials']);
  });

  it('should return empty array for null/undefined', () => {
    expect(service.extractServerErrors(null)).toEqual([]);
    expect(service.extractServerErrors(undefined)).toEqual([]);
  });
});
