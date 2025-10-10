import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'log-in',
    component: LogInComponent
  }
];
