import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageRouteDirective } from '../../../../shared/directives/language-route.directive';

@Component({
  selector: 'app-cabinet-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageRouteDirective],
  templateUrl: './cabinet-sidebar.component.html'
})
export class CabinetSidebarComponent {
  items = [
    { label: 'Subscription', route: 'cabinet/edit-profile', icon: 'credit-card', disabled: true },
    { label: 'Previous Order', route: 'cabinet/edit-profile', icon: 'clock', disabled: true },
    { label: 'Invoices', route: 'cabinet/edit-profile', icon: 'receipt', disabled: true },
    { label: 'Locations', route: 'cabinet/locations', icon: 'location', disabled: false },
    { label: 'Edit Profile', route: 'cabinet/edit-profile', icon: 'user', disabled: false }
  ];
}
