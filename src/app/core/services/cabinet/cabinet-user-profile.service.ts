import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BaseService } from '../base.service';
import { GetCompanyData } from '../../models/api.models';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CabinetUserProfileService extends BaseService {
  constructor(private http: HttpClient) { super(); }

  private profileSubject = new BehaviorSubject<GetCompanyData | null>(null);
  public profile$ = this.profileSubject.asObservable();

  private getUserProfile(): Observable<GetCompanyData> {
    return this.http.get<GetCompanyData>(`${this.API_URL}/api/Company`)
      .pipe(catchError(err => this.handleError(err)));
  }

  private loadAndCacheProfile(): Observable<GetCompanyData> {
    return this.getUserProfile().pipe(
      map(profile => {
        if (profile) {
          this.profileSubject.next(profile);
          return profile;
        }
        throw new Error('Failed to load profile');
      }),
      catchError(err => this.handleError(err)),
      shareReplay(1)
    );
  }

  load$(): Observable<GetCompanyData | null> {
    if (this.profileSubject.value) {
      return this.profile$;
    }
    this.loadAndCacheProfile().pipe(
      catchError(() => of(null as unknown as GetCompanyData))
    ).subscribe();
    return this.profile$;
  }

  refreshUserProfile(): Observable<GetCompanyData> {
    return this.loadAndCacheProfile();
  }
}
