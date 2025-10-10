import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { BaseService } from '../base.service';
import {EditCompanyRequest, Result} from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class CabinetUserProfileEditService extends BaseService {
  constructor(private http: HttpClient) { super(); }

  edit(request: EditCompanyRequest): Observable<Result<unknown>> {
    return this.http.put<Result<unknown>>(`${this.API_URL}/api/Cabinet/Edit`, request)
      .pipe(catchError(err => this.handleError(err)));
  }
}
