import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageRouteDirective } from '../../directives';

interface SocialLink {
  id: number;
  name: string;
  icon: string;
  href: string;
}

interface FooterLink {
  id: number;
  title: string;
  titleKey: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    LanguageRouteDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks: SocialLink[] = [
    {
      id: 1,
      name: 'Facebook',
      icon: 'assets/images/social/facebook.png',
      href: 'https://www.facebook.com/Coffeehub.ge',
    },
    {
      id: 2,
      name: 'X',
      icon: 'assets/images/social/X.png',
      href: '#',
    },
    {
      id: 4,
      name: 'Instagram',
      icon: 'assets/images/social/instagram.png',
      href: '#',
    },
    {
      id: 5,
      name: 'LinkedIn',
      icon: 'assets/images/social/linkedin.png',
      href: '#',
    },
  ];

  footerLinks: FooterLink[] = [
    {
      id: 1,
      title: 'Contact',
      titleKey: 'common.contact',
      path: 'contacts',
    },
    {
      id: 2,
      title: 'Terms & Conditions',
      titleKey: 'common.terms_and_conditions',
      path: 'terms',
    },
    {
      id: 3,
      title: 'FAQ',
      titleKey: 'common.faq',
      path: 'faq',
    },
  ];
}
