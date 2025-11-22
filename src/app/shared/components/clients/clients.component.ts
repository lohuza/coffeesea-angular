import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  clients = [
    {
      name: 'Cafe Mocha',
      logo: 'assets/images/brands/illy.png'
    },
    {
      name: 'Bean & Brew',
      logo: 'assets/images/brands/illy.png'
    },
    {
      name: 'Morning Sip',
      logo: 'assets/images/brands/illy.png'
    },
    {
      name: 'Coffee Republic',
      logo: 'assets/images/brands/illy.png'
    },
    {
      name: 'Urban Brews',
      logo: 'assets/images/brands/illy.png'
    },
    {
      name: 'Java Junction',
      logo: 'assets/images/brands/illy.png'
    }
  ];
}
