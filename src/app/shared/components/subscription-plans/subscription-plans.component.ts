import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent {
  plans = [
    {
      name: 'Basic',
      price: 19.99,
      period: 'monthly',
      features: [
        '1 coffee blend per month',
        'Free shipping',
        'Access to coffee guides',
        'Cancel anytime'
      ],
      isPopular: false
    },
    {
      name: 'Premium',
      price: 39.99,
      period: 'monthly',
      features: [
        '2 coffee blends per month',
        'Free shipping',
        'Access to coffee guides',
        'Brewing equipment discounts',
        'Cancel anytime'
      ],
      isPopular: true
    },
    {
      name: 'Connoisseur',
      price: 59.99,
      period: 'monthly',
      features: [
        '3 rare coffee blends per month',
        'Free shipping',
        'Access to coffee guides',
        'Brewing equipment discounts',
        'Virtual tasting sessions',
        'Cancel anytime'
      ],
      isPopular: false
    }
  ];
} 