import { Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LocationsComponent } from './locations/locations.component';

export const CABINET_ROUTES: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    children: [
      { path: '', redirectTo: 'edit-profile', pathMatch: 'full' },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'locations', component: LocationsComponent }
      // Future: subscription, previous-order, invoices
    ]
  }
];
