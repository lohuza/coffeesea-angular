import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CoffeeMachine } from '../../features/purchase/components/coffee-machine-card/coffee-machine-card.component';
import { CoffeeItem, CoffeeBrand } from '../../features/purchase/components/coffee-card/coffee-card.component';

@Injectable({ providedIn: 'root' })
export class DataService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  // GET: /api/Data/CoffeeMachines
  getCoffeeMachines(): Observable<CoffeeMachine[]> {
    return this.http
      .get<CoffeeMachine[]>(`${this.API_URL}/api/Data/CoffeeMachines`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // GET: /api/Data/Coffees
  getCoffees(): Observable<CoffeeItem[]> {
    return this.http
      .get<CoffeeItem[]>(`${this.API_URL}/api/Data/Coffees`)
      .pipe(catchError(err => this.handleError(err)));
  }

  // GET: /api/Data/CoffeeBrands
  getCoffeeBrands(): Observable<CoffeeBrand[]> {
    return this.http
      .get<CoffeeBrand[]>(`${this.API_URL}/api/Data/CoffeeBrands`)
      .pipe(catchError(err => this.handleError(err)));
  }
}
