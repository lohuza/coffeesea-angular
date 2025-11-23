import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeCardComponent, CoffeeItem } from '../../components/coffee-card/coffee-card.component';

@Component({
  selector: 'app-choose-coffee-step',
  standalone: true,
  imports: [CommonModule, CoffeeCardComponent],
  templateUrl: './choose-coffee-step.component.html',
  styleUrl: './choose-coffee-step.component.css'
})
export class ChooseCoffeeStepComponent {
  // Mock coffees for UI
  coffees: CoffeeItem[] = [
    {
      id: 'ethiopia-250',
      name: 'Ethiopia Yirgacheffe',
      price: 24.9,
      imageUrl: 'assets/images/coffee-brand.png',
      roast: 'Light',
      origin: 'Ethiopia',
      size: '250g',
      notes: 'Floral, citrus, tea-like body'
    },
    {
      id: 'colombia-500',
      name: 'Colombia Supremo',
      price: 29.5,
      imageUrl: 'assets/images/coffee-brand.png',
      roast: 'Medium',
      origin: 'Colombia',
      size: '500g',
      notes: 'Chocolate, caramel, balanced acidity'
    },
    {
      id: 'kenya-250',
      name: 'Kenya AA',
      price: 26.0,
      imageUrl: 'assets/images/coffee-brand.png',
      roast: 'Medium',
      origin: 'Kenya',
      size: '250g',
      notes: 'Berry sweetness, winey acidity'
    },
    {
      id: 'sumatra-250',
      name: 'Sumatra Mandheling',
      price: 25.0,
      imageUrl: 'assets/images/coffee-brand.png',
      roast: 'Dark',
      origin: 'Indonesia',
      size: '250g',
      notes: 'Earthy, spicy, low acidity'
    }
  ];

  // Placeholder handlers for filter Apply/Reset can be added later; UI only now.
}
