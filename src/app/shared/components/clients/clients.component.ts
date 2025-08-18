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
      logo: 'assets/images/clients/client1.png'
    },
    {
      name: 'Bean & Brew',
      logo: 'assets/images/clients/client2.png'
    },
    {
      name: 'Morning Sip',
      logo: 'assets/images/clients/client3.png'
    },
    {
      name: 'Coffee Republic',
      logo: 'assets/images/clients/client4.png'
    },
    {
      name: 'Urban Brews',
      logo: 'assets/images/clients/client5.png'
    },
    {
      name: 'Java Junction',
      logo: 'assets/images/clients/client6.png'
    }
  ];
} 