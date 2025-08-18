import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {
  LoginRequest,
  SignInRequest,
  RefreshTokenRequest,
  AuthResponse
} from '../models/api.models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly EXPIRES_AT_KEY = 'expires_at';
  private isBrowser: boolean;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
    this.isAuthenticatedSubject.next(this.hasValidToken());
  }

  signIn(request: SignInRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/api/Authentication/SignIn`, request)
      .pipe(
        tap(response => this.setSession(response)),
        catchError(error => this.handleError(error))
      );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/api/Authentication/LogIn`, request)
      .pipe(
        tap(response => this.setSession(response)),
        catchError(error => this.handleError(error))
      );
  }

  refreshToken(): Observable<AuthResponse> {
    const token = this.getFromStorage(this.TOKEN_KEY);
    const refreshToken = this.getFromStorage(this.REFRESH_TOKEN_KEY);

    if (!token || !refreshToken) {
      return throwError(() => new Error('No token available to refresh'));
    }

    const request: RefreshTokenRequest = {
      token,
      refreshToken
    };

    return this.http.post<AuthResponse>(`${this.API_URL}/api/Authentication/RefreshToken`, request)
      .pipe(
        tap(response => this.setSession(response)),
        catchError(error => this.handleError(error))
      );
  }

  logout(): void {
    this.removeFromStorage(this.TOKEN_KEY);
    this.removeFromStorage(this.REFRESH_TOKEN_KEY);
    this.removeFromStorage(this.EXPIRES_AT_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  getToken(): string | null {
    return this.getFromStorage(this.TOKEN_KEY);
  }

  private setSession(authResult: AuthResponse): void {
    const expiresAt = new Date().getTime() + (authResult.expiresIn * 1000);

    this.saveToStorage(this.TOKEN_KEY, authResult.token);
    this.saveToStorage(this.REFRESH_TOKEN_KEY, authResult.refreshToken);
    this.saveToStorage(this.EXPIRES_AT_KEY, expiresAt.toString());

    this.isAuthenticatedSubject.next(true);
  }

  private hasValidToken(): boolean {
    if (!this.isBrowser) return false;

    const token = this.getFromStorage(this.TOKEN_KEY);
    const expiresAt = this.getFromStorage(this.EXPIRES_AT_KEY);

    if (!token || !expiresAt) {
      return false;
    }

    return new Date().getTime() < parseInt(expiresAt, 10);
  }

  private saveToStorage(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }

  private getFromStorage(key: string): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  private removeFromStorage(key: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  }
}
