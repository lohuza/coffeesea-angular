import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from './data.service';
import { CoffeeMachine } from '../../features/purchase/components/coffee-machine-card/coffee-machine-card.component';
import { CoffeeBrand, CoffeeItem } from '../../features/purchase/components/coffee-card/coffee-card.component';

interface CacheEntry<T> {
  expiresAt: number;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class DataCacheService {
  private readonly ONE_HOUR = 60 * 60 * 1000;
  private readonly isBrowser: boolean;

  private readonly KEYS = {
    coffees: 'cache:data:coffees',
    machines: 'cache:data:machines',
    brands: 'cache:data:brands'
  } as const;

  constructor(private dataService: DataService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getCoffees(ttlMs: number = this.ONE_HOUR): Observable<CoffeeItem[]> {
    const cached = this.getFromCache<CoffeeItem[]>(this.KEYS.coffees);
    if (cached) return of(cached);
    return this.dataService.getCoffees().pipe(
      tap(data => this.saveToCache(this.KEYS.coffees, data, ttlMs))
    );
  }

  getCoffeeMachines(ttlMs: number = this.ONE_HOUR): Observable<CoffeeMachine[]> {
    const cached = this.getFromCache<CoffeeMachine[]>(this.KEYS.machines);
    if (cached) return of(cached);
    return this.dataService.getCoffeeMachines().pipe(
      tap(data => this.saveToCache(this.KEYS.machines, data, ttlMs))
    );
  }

  getCoffeeBrands(ttlMs: number = this.ONE_HOUR): Observable<CoffeeBrand[]> {
    const cached = this.getFromCache<CoffeeBrand[]>(this.KEYS.brands);
    if (cached) return of(cached);
    return this.dataService.getCoffeeBrands().pipe(
      tap(data => this.saveToCache(this.KEYS.brands, data, ttlMs))
    );
  }

  private getFromCache<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const entry = JSON.parse(raw) as CacheEntry<T>;
      if (!entry || typeof entry.expiresAt !== 'number') return null;
      if (Date.now() >= entry.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }
      return entry.data;
    } catch {
      return null;
    }
  }

  private saveToCache<T>(key: string, data: T, ttlMs: number): void {
    if (!this.isBrowser) return;
    const entry: CacheEntry<T> = {
      expiresAt: Date.now() + ttlMs,
      data
    };
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // ignore storage errors
    }
  }
}
