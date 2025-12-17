import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeCardComponent, CoffeeItem } from '../../components/coffee-card/coffee-card.component';
import { DataCacheService } from '../../../../core/services/data-cache.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-choose-coffee-step',
  standalone: true,
  imports: [CommonModule, CoffeeCardComponent],
  templateUrl: './choose-coffee-step.component.html',
  styleUrl: './choose-coffee-step.component.css'
})
export class ChooseCoffeeStepComponent implements OnInit {
  coffees: CoffeeItem[] = [];

  constructor(private cache: DataCacheService, public cart: CartService) {}

  ngOnInit(): void {
    this.cache.getCoffees().subscribe({
      next: data => this.coffees = data ?? [],
      error: _ => this.coffees = []
    });
  }

  getQty(id: string): number {
    return this.cart.getCoffeeQty(id);
  }

  onQtyChange(item: CoffeeItem, quantity: number) {
    this.cart.setCoffeeQuantity(item, quantity);
  }
}
