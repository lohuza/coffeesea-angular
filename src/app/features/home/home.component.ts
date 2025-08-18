import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeroComponent,
  BrandsComponent,
  TestimonialsComponent,
  AdvantagesComponent,
  SubscriptionPlansComponent,
  ClientsComponent
} from '../../shared/components';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    BrandsComponent,
    TestimonialsComponent,
    AdvantagesComponent,
    SubscriptionPlansComponent,
    ClientsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private translate = inject(TranslateService);
  title = 'CoffeeSea - Premium Coffee Experience';

  constructor() {
    const currentLang = this.translate.currentLang || this.translate.getBrowserLang() || 'en';
    this.translate.use(currentLang);
  }
}
