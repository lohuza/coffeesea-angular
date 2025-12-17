import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ValidationFailure } from '../models/api.models';
import { environment } from '../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export abstract class BaseService {
  protected readonly API_URL = environment.apiUrl;

  protected handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof HttpErrorResponse) {
      const httpErr = error as HttpErrorResponse;
      // Handle validation errors in array form (legacy)
      const maybeValues = (httpErr.error && (httpErr.error.$values as ValidationFailure[])) || null;
      if (Array.isArray(maybeValues) && maybeValues.length) {
        errorMessage = maybeValues.map(v => v?.errorMessage).join(' ');
      }
      // Handle RFC 9110 style Unauthorized object: { type, title, status, traceId }
      else if (httpErr.error && typeof httpErr.error === 'object' && httpErr.error.title) {
        errorMessage = httpErr.error.title;
      }
      // Fallbacks
      else if (httpErr.error && httpErr.error.message) {
        errorMessage = httpErr.error.message;
      } else if (httpErr.message) {
        errorMessage = httpErr.message;
      }
    }
    else if (error.error instanceof Array && error.error[0] && error.error[0].errorMessage) {
      const errors = error.error as ValidationFailure[];
      errorMessage = errors.map(e => e.errorMessage).join(' ');
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.error && error.error.title) {
      errorMessage = error.error.title;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}
