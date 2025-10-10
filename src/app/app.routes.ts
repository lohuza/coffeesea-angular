import { Routes } from '@angular/router';
import { HOME_ROUTES } from './features/home';
import { ABOUT_ROUTES } from './features/about';
import { CONTACTS_ROUTES } from './features/contacts';
import { SERVICES_ROUTES } from './features/services';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { CABINET_ROUTES } from './features/cabinet/cabinet.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  },
  {
    path: ':lang',
    children: [
      {
        path: '',
        children: HOME_ROUTES
      },
      {
        path: 'about',
        children: ABOUT_ROUTES
      },
      {
        path: 'contacts',
        children: CONTACTS_ROUTES
      },
      {
        path: 'services',
        children: SERVICES_ROUTES
      },
      {
        path: '',
        children: AUTH_ROUTES
      },
      {
        path: '',
        children: CABINET_ROUTES
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'en',
    pathMatch: 'full'
  }
];
