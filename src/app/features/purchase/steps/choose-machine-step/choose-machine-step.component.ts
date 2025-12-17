import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeMachine, CoffeeMachineCardComponent } from '../../components/coffee-machine-card/coffee-machine-card.component';
import { DataCacheService } from '../../../../core/services/data-cache.service';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-choose-machine-step',
  standalone: true,
  imports: [CommonModule, CoffeeMachineCardComponent],
  templateUrl: './choose-machine-step.component.html',
  styleUrl: './choose-machine-step.component.css'
})
export class ChooseMachineStepComponent implements OnInit {
  @Output() selected = new EventEmitter<CoffeeMachine>();
  @Output() skip = new EventEmitter<void>();

  machines: CoffeeMachine[] = [];

  constructor(private cache: DataCacheService, public cart: CartService) {}

  ngOnInit(): void {
    this.cache.getCoffeeMachines().subscribe({
      next: data => this.machines = data ?? [],
      error: _ => this.machines = []
    });
    // set selected from cart if present
    const m = this.cart.state().machine;
    if (m?.id) this.selectedId.set(m.id);
  }

  selectedId = signal<string | null>(null);

  choose(m: CoffeeMachine) {
    this.selectedId.set(m.id);
    this.selected.emit(m);
    this.cart.setMachine(m);
  }
}
