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
    { name: 'PSP', logo: 'assets/images/brands/illy.png' },
    { name: 'TBC Bank', logo: 'assets/images/brands/illy.png' },
    { name: 'Bank of Georgia', logo: 'assets/images/brands/illy.png' },
    { name: 'Silknet', logo: 'assets/images/brands/illy.png' },
    { name: 'Geocell', logo: 'assets/images/brands/illy.png' },
    { name: 'Magti', logo: 'assets/images/brands/illy.png' },
    { name: 'Liberty Bank', logo: 'assets/images/brands/illy.png' },
    { name: 'Wissol', logo: 'assets/images/brands/illy.png' }
  ];
}
