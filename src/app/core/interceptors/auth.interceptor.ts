import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/api.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private authService = inject(AuthService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding the token for SignIn/LogIn; include for RefreshToken (server expects bearer)
    if (this.isAuthRequestWithoutBearer(request)) {
      return next.handle(request);
    }

    const token = this.authService.getToken();

    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Do not attempt refresh for auth endpoints; just propagate/log out accordingly
          if (this.isAuthEndpoint(request)) {
            if (request.url.includes('/api/Authentication/RefreshToken')) {
              // If refresh failed with 401, clear session
              this.authService.logout();
            }
            return throwError(() => error);
          }
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private isAuthRequestWithoutBearer(request: HttpRequest<any>): boolean {
    return (
      request.url.includes('/api/Authentication/SignIn') ||
      request.url.includes('/api/Authentication/LogIn')
    );
  }

  private isAuthEndpoint(request: HttpRequest<any>): boolean {
    return (
      request.url.includes('/api/Authentication/SignIn') ||
      request.url.includes('/api/Authentication/LogIn') ||
      request.url.includes('/api/Authentication/RefreshToken')
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((resp: AuthResponse) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(resp.token);
          return next.handle(this.addToken(request, resp.token));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token as string));
        })
      );
    }
  }
}
