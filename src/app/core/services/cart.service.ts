import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CoffeeItem } from '../../features/purchase/components/coffee-card/coffee-card.component';
import { CoffeeMachine } from '../../features/purchase/components/coffee-machine-card/coffee-machine-card.component';

export interface CartState {
  machine: CoffeeMachine | null;
  // use CoffeeItem directly (no duplicate line interface), and store qty alongside it
  coffees: Record<string, (CoffeeItem & { qty: number })>;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'purchase:cart:v1';
  private readonly isBrowser: boolean;

  readonly state = signal<CartState>({ machine: null, coffees: {} });

  readonly totalCoffees = computed(() => Object.values(this.state().coffees).reduce((s, l) => s + l.qty, 0));
  readonly subtotal = computed(() => {
    const coffeeTotal = Object.values(this.state().coffees).reduce((s, l) => {
      const unit = l.salePrice && l.salePrice < l.price ? l.salePrice : l.price;
      return s + l.qty * unit;
    }, 0);
    const machineTotal = this.state().machine?.price ?? 0;
    return coffeeTotal + machineTotal;
  });

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();
  }

  setMachine(machine: CoffeeMachine | null) {
    this.state.update(s => ({ ...s, machine }));
    this.persist();
  }

  setCoffeeQuantity(item: CoffeeItem, qty: number) {
    this.state.update(s => {
      const coffees = { ...s.coffees };
      if (qty <= 0) {
        delete coffees[item.id];
      } else {
        // store the whole CoffeeItem to avoid duplicating fields/interfaces
        coffees[item.id] = { ...item, qty };
      }
      return { ...s, coffees };
    });
    this.persist();
  }

  removeCoffee(id: string) {
    this.state.update(s => {
      if (!s.coffees[id]) return s;
      const coffees = { ...s.coffees };
      delete coffees[id];
      return { ...s, coffees };
    });
    this.persist();
  }

  removeMachine() {
    this.setMachine(null);
  }

  getCoffeeQty(id: string): number {
    return this.state().coffees[id]?.qty ?? 0;
  }

  clear() {
    this.state.set({ machine: null, coffees: {} });
    this.persist();
  }

  private load() {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (parsed && typeof parsed === 'object') {
        // basic validation
        const machine = parsed.machine ?? null;
        const coffees = parsed.coffees ?? {};
        this.state.set({ machine, coffees });
      }
    } catch {
      // ignore
    }
  }

  private persist() {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      // ignore
    }
  }
}
