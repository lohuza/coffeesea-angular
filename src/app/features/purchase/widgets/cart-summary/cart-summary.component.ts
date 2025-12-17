import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  readonly cart = inject(CartService);

  readonly lines = computed(() => Object.values(this.cart.state().coffees));
  readonly hasItems = computed(() => !!this.cart.state().machine || this.lines().length > 0);

  clear() {
    this.cart.clear();
  }

  removeCoffee(id: string) {
    this.cart.removeCoffee(id);
  }

  removeMachine() {
    this.cart.removeMachine();
  }
}
