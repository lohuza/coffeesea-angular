import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {}

  navigateWithLang(commands: string[], extras?: NavigationExtras): void {
    const currentLang = this.translationService.getCurrentLang();

    const newCommands = [currentLang, ...commands.filter(cmd => !!cmd)];

    this.router.navigate(newCommands, extras);
  }

  getLangRoute(path: string = ''): string[] {
    const currentLang = this.translationService.getCurrentLang();
    if (!path) return ['/', currentLang];
    const segments = path.split('/').filter(Boolean);
    return ['/', currentLang, ...segments];
  }

  reloadWithLanguage(lang: string): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const segments = urlTree.root.children['primary']?.segments;

    if (segments && segments.length > 0) {
      const currentUrl = this.router.url;
      const newUrl = currentUrl.replace(/^\/[^\/]+/, '/' + lang);
      this.router.navigateByUrl(newUrl);
    } else {
      this.router.navigate(['/', lang]);
    }
  }
}
