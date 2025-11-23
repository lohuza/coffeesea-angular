import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OrderSummaryItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  imageUrl: string;
  note?: string;
}

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  @Input() items: OrderSummaryItem[] = [];

  get subtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  // Placeholder values for UI
  delivery = 10;
  totalSale = 310; // as in mock screenshot

  get total(): number {
    return Math.max(0, this.subtotal + this.delivery - this.totalSale);
  }
}
