import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeMachine, CoffeeMachineCardComponent } from '../../components/coffee-machine-card/coffee-machine-card.component';

@Component({
  selector: 'app-choose-machine-step',
  standalone: true,
  imports: [CommonModule, CoffeeMachineCardComponent],
  templateUrl: './choose-machine-step.component.html',
  styleUrl: './choose-machine-step.component.css'
})
export class ChooseMachineStepComponent {
  @Output() selected = new EventEmitter<CoffeeMachine>();
  @Output() skip = new EventEmitter<void>();

  machines: CoffeeMachine[] = [
    {
      id: 'delonghi-s2',
      name: 'Delonghi Magnifica S2',
      price: 450,
      imageUrl: 'assets/images/brands/illy.png',
      features: [
        'Feature one',
        'Feature two',
        'Feature three',
        'Feature four',
        'Feature five',
        'Feature six'
      ]
    },
    {
      id: 'delonghi-s3',
      name: 'Delonghi Magnifica S3',
      price: 450,
      imageUrl: 'assets/images/brands/illy.png',
      features: [
        'Feature one',
        'Feature two',
        'Feature three',
        'Feature four',
        'Feature five',
        'Feature six'
      ]
    },
    {
      id: 'delonghi-s4',
      name: 'Delonghi Magnifica S4',
      price: 450,
      imageUrl: 'assets/images/brands/illy.png',
      features: [
        'Feature one',
        'Feature two',
        'Feature three',
        'Feature four',
        'Feature five',
        'Feature six'
      ]
    }
  ];

  selectedId = signal<string | null>(null);

  choose(m: CoffeeMachine) {
    this.selectedId.set(m.id);
    this.selected.emit(m);
  }
}
