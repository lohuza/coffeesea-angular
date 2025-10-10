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
      errorMessage = ((error as HttpErrorResponse).error.$values as ValidationFailure[])
        .map(v => v?.errorMessage).join(' ');
    }
    else if (error.error instanceof Array && error.error[0] && error.error[0].errorMessage) {
      const errors = error.error as ValidationFailure[];
      errorMessage = errors.map(e => e.errorMessage).join(' ');
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}
