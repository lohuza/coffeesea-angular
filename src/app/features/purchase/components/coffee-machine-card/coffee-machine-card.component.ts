import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CoffeeMachine {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  benefits: string[];
}

@Component({
  selector: 'app-coffee-machine-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-machine-card.component.html',
  styleUrl: './coffee-machine-card.component.css'
})
export class CoffeeMachineCardComponent {
  @Input() machine!: CoffeeMachine;
  @Input() selected = false;
  @Output() select = new EventEmitter<CoffeeMachine>();
}
