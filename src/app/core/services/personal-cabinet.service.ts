import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CompanyPerson,
  EditCompanyRequest,
  Location
} from '../models/api.models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalCabinetService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getUserProfile(): Observable<CompanyPerson> {
    return this.http.get<CompanyPerson>(`${this.API_URL}/api/PersonalCabinet`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getUserLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.API_URL}/api/PersonalCabinet/Locations`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  editCompany(editRequest: EditCompanyRequest): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/api/PersonalCabinet/EditCompany`, editRequest)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
}
