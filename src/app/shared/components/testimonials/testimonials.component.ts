import { Component, AfterViewInit, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  testimonials = [
    {
      id: 1,
      name: 'Salome Giorgadze',
      image: 'assets/images/testimonials/salome.png',
      text: "As a coffee enthusiast, I appreciate the quality in every cup. The coffee machines are reliable, the beans are fresh, and perfect for our busy office. I'm hooked!"
    },
    {
      id: 2,
      name: 'Giorgi Maisuradze',
      image: 'assets/images/testimonials/giorgi.png',
      text: "I've been a customer for years, and I'm always excited to try the latest coffee blends. The flavors are rich and exciting, and the customer service is top-notch."
    },
    {
      id: 3,
      name: 'Maka Chkeidze',
      image: 'assets/images/testimonials/maka.png',
      text: "I can't express how much I adore the premium coffee selection from CoffeeSea. Each blend has its own unique character and charm. Our team loves it!"
    },
    {
      id: 4,
      name: 'Davit Kapanadze',
      image: 'assets/images/testimonials/giorgi.png',
      text: "The subscription service is incredibly convenient. Fresh coffee delivered right to our office, and the machines practically maintain themselves. Highly recommend!"
    },
    {
      id: 5,
      name: 'Nino Beridze',
      image: 'assets/images/testimonials/salome.png',
      text: "CoffeeSea transformed our office coffee culture. Employees are happier, more productive, and we've saved money compared to coffee shop runs. Win-win!"
    }
  ];

  ngAfterViewInit() {
    register();
  }

  slideNext() {
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.slideNext();
    }
  }

  slidePrev() {
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.slidePrev();
    }
  }
}
