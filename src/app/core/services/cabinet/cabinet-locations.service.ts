import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { EditLocationRequest, AddLocationRequest, Location, Result } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class CabinetLocationsService extends BaseService {
  constructor(private http: HttpClient) { super(); }

  private locationsSubject = new BehaviorSubject<Location[] | null>(null);
  public locations$ = this.locationsSubject.asObservable();

  private fetchLocations(): Observable<Location[]> {
    return this.http.get<any>(`${this.API_URL}/api/Locations`)
      .pipe(
        map(res => {
          // Support both shapes: plain array or { $values: [...] }
          if (Array.isArray(res)) {
            return res as Location[];
          }
          if (res && Array.isArray(res.$values)) {
            return res.$values as Location[];
          }
          return [] as Location[];
        }),
        catchError(error => this.handleError(error))
      );
  }

  private loadAndCacheLocations(): Observable<Location[]> {
    return this.fetchLocations().pipe(
      tap(locs => this.locationsSubject.next(locs)),
      shareReplay(1),
      catchError(err => this.handleError(err))
    );
  }

  getLocations(): Observable<Location[] | null> {
    if (this.locationsSubject.value) {
      return this.locations$;
    }
    this.loadAndCacheLocations().pipe(
      catchError(() => of([] as Location[]))
    ).subscribe();
    return this.locations$;
  }

  load$(): Observable<Location[] | null> {
    return this.getLocations();
  }

  refreshLocations(): Observable<Location[]> {
    return this.loadAndCacheLocations();
  }

  add(address: string): Observable<Result<unknown>> {
    return this.http.post<Result<unknown>>(`${this.API_URL}/api/Locations`, { address: address } as AddLocationRequest)
      .pipe(catchError(error => this.handleError(error)));
  }

  edit(id: string, address: string): Observable<Result<unknown>> {
    return this.http.put<Result<unknown>>(`${this.API_URL}/api/Locations`, { id: id, address: address } as EditLocationRequest)
      .pipe(catchError(error => this.handleError(error)));
  }

  delete(id: string): Observable<Result<unknown>> {
    return this.http.delete<Result<unknown>>(`${this.API_URL}/api/Locations/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }
}
