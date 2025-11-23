import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CoffeeItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  roast: 'Light' | 'Medium' | 'Dark';
  origin: string;
  size: string; // e.g., 250g, 500g
  notes?: string;
}

@Component({
  selector: 'app-coffee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-card.component.html',
  styleUrl: './coffee-card.component.css'
})
export class CoffeeCardComponent implements OnInit {
  @Input() coffee!: CoffeeItem;
  @Input() initialQty = 0;
  @Output() quantityChange = new EventEmitter<{ coffeeId: string; quantity: number }>();

  qty = signal(0);

  ngOnInit() {
    this.qty.set(this.initialQty);
  }

  inc() {
    const newVal = this.qty() + 1;
    this.qty.set(newVal);
    this.quantityChange.emit({ coffeeId: this.coffee.id, quantity: newVal });
  }

  dec() {
    const newVal = Math.max(0, this.qty() - 1);
    this.qty.set(newVal);
    this.quantityChange.emit({ coffeeId: this.coffee.id, quantity: newVal });
  }
}
