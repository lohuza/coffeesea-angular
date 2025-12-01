import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.css']
})
export class SubscriptionPlansComponent {
  private router = inject(Router);
  private translate = inject(TranslationService);

  plans = [
    {
      name: 'plans.lite_plan',
      price: 49.99,
      description: 'plans.lite_plan_description',
      features: [
        'plans.4_boxes_coffee',
        'plans.2_different_flavors',
        'plans.1_mystery_box'
      ],
      isFeatured: false
    },
    {
      name: 'plans.standard_plan',
      price: 129.99,
      description: 'plans.standard_plan_description',
      features: [
        'plans.12_boxes_coffee',
        'plans.6_different_flavors',
        'plans.2_mystery_boxes',
        'plans.coffee_recipes'
      ],
      isFeatured: true
    },
    {
      name: 'plans.pro_plan',
      price: 249.99,
      description: 'plans.pro_plan_description',
      features: [
        'plans.24_boxes_coffee',
        'plans.12_different_flavors',
        'plans.3_mystery_boxes',
        'plans.coffee_recipes',
        'plans.24_7_delivery'
      ],
      isFeatured: false
    }
  ];

  goToPurchase() {
    const lang = this.translate.getCurrentLang();
    this.router.navigate([lang, 'purchase']);
  }
}
