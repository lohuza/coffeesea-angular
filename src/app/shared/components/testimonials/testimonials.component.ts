import { Component, AfterViewInit, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestimonialsComponent implements AfterViewInit {
  testimonials = [
    {
      id: 1,
      name: 'Salome Gogoladze',
      image: 'assets/images/testimonials/salome.png',
      text: "As a fashion enthusiast, I appreciate the craftsmanship in every piece. These UGGs are comfortable, stylish, and perfect for any occasion. I'm hooked!"
    },
    {
      id: 2,
      name: 'Giorgi Maisuradze',
      image: 'assets/images/testimonials/giorgi.png',
      text: "I've been a customer for years, and I'm always excited to see the latest releases. The designs are fresh and exciting, and the customer service is top-notch."
    },
    {
      id: 3,
      name: 'Maka Chkhaidze',
      image: 'assets/images/testimonials/maka.png',
      text: "I can't express how much I adore the unique tasting system they use what matters business. Each piece has its own character and charm."
    }
  ];

  ngAfterViewInit() {
    register();
  }
}
