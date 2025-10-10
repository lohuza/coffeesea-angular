import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../base.service';
import { EditLocationRequest, AddLocationRequest, Location, Result } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class CabinetLocationsService extends BaseService {
  constructor(private http: HttpClient) { super(); }

  getLocations(): Observable<Location[]> {
    return this.http.get<any>(`${this.API_URL}/api/Cabinet/Locations`)
      .pipe(
        map(res => res.$values as Location[]),
        catchError(error => this.handleError(error))
      );
  }

  add(address: string): Observable<Result<unknown>> {
    return this.http.post<Result<unknown>>(`${this.API_URL}/api/Cabinet/Locations/Add`, { address: address } as AddLocationRequest)
      .pipe(catchError(error => this.handleError(error)));
  }

  edit(id: string, address: string): Observable<Result<unknown>> {
    return this.http.put<Result<unknown>>(`${this.API_URL}/api/Cabinet/Locations/Edit`, { id: id, address: address } as EditLocationRequest)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(id: string): Observable<Result<unknown>> {
    return this.http.delete<Result<unknown>>(`${this.API_URL}/api/Cabinet/Locations/Delete/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }
}
