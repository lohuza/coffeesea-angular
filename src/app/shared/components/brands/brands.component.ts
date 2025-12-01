import { Component, AfterViewInit, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrandsComponent implements AfterViewInit {
  brands = [
    { id: 1, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 2, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 3, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 4, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 5, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 6, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 7, name: 'Illy', logo: 'assets/images/brands/illy.png' },
    { id: 8, name: 'Illy', logo: 'assets/images/brands/illy.png' }
  ];

  ngAfterViewInit() {
    register();
  }
}
