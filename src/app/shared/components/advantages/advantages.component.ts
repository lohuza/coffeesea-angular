import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-advantages',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.css']
})
export class AdvantagesComponent {
  advantages = [
    {
      title: 'home.new_coffee_machines',
      description: 'home.new_coffee_machines_description',
      icon: 'assets/icons/quality.svg'
    },
    {
      title: 'home.unlimited_coffee',
      description: 'home.unlimited_coffee_description',
      icon: 'assets/icons/trade.svg'
    },
    {
      title: 'home.constant_sales',
      description: 'home.constant_sales_description',
      icon: 'assets/icons/sustainable.svg'
    },
    {
      title: 'Fast Delivery',
      description: 'From roasting to your door in less than 48 hours',
      icon: 'assets/icons/delivery.svg'
    }
  ];
} 