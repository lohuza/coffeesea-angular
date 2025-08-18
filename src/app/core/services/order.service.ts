import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderData } from '../models/api.models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getOrderStatus(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/Order/Status`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  placeOrder(orderData: OrderData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/Order/Place`, orderData)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  downloadOrder(orderData: OrderData): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/Order/Download`, orderData, {
      responseType: 'blob' as 'json'
    })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
}
