import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { CartSummaryComponent } from '../../features/purchase/widgets/cart-summary/cart-summary.component';

@Component({
  selector: 'app-floating-cart',
  standalone: true,
  imports: [CommonModule, CartSummaryComponent],
  templateUrl: './floating-cart.component.html',
  styleUrl: './floating-cart.component.css'
})
export class FloatingCartComponent {
  readonly cart = inject(CartService);

  readonly hasItems = computed(() => !!this.cart.state().machine || Object.keys(this.cart.state().coffees).length > 0);
  readonly subtotal = computed(() => this.cart.subtotal());

  readonly open = signal(false);

  toggle() {
    if (!this.hasItems()) return;
    this.open.update(v => !v);
  }

  close() {
    this.open.set(false);
  }
}
