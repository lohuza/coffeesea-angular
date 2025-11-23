import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent, OrderSummaryItem } from '../../components/order-summary/order-summary.component';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';

@Component({
  selector: 'app-checkout-step',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent, CheckoutFormComponent],
  templateUrl: './checkout-step.component.html',
  styleUrl: './checkout-step.component.css'
})
export class CheckoutStepComponent {
  @Output() request = new EventEmitter<void>();

  items: OrderSummaryItem[] = [
    { id: 'gold-blend-1', title: 'Gold Blend', price: 90, qty: 1, imageUrl: 'assets/images/coffee-brand.png', note: 'Coffee sea suggests' },
    { id: 'gold-blend-2', title: 'Gold Blend S', price: 90, qty: 2, imageUrl: 'assets/images/coffee-brand.png' },
    { id: 'gold-blend-3', title: 'Gold Blend S', price: 90, qty: 1, imageUrl: 'assets/images/coffee-brand.png' }
  ];

  onSubmitted() {
    // Placeholder emit for parent handling
    this.request.emit();
  }
}
