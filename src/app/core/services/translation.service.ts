import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';

export type Language = 'en' | 'ka';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly isBrowser: boolean;
  private currentLangSubject: BehaviorSubject<Language>;
  public currentLang$: Observable<Language>;

  readonly languageLabels: Record<Language, string> = {
    'en': 'ENG',
    'ka': 'GEO'
  };

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.currentLangSubject = new BehaviorSubject<Language>('en');
    this.currentLang$ = this.currentLangSubject.asObservable();

    this.initializeTranslateService();

    this.initializeFromUrl();
  }

  private initializeTranslateService() {
    this.translate.addLangs(['en', 'ka']);
    this.translate.setDefaultLang('en');
  }

  private initializeFromUrl() {
    if (this.isBrowser) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateLanguageFromUrl();
      });

      this.updateLanguageFromUrl();
    }
  }

  private updateLanguageFromUrl() {
    let lang: Language = 'en';

    this.route.root.firstChild?.paramMap.pipe(
      take(1)
    ).subscribe(params => {
      const urlLang = params.get('lang');
      if (urlLang && ['en', 'ka'].includes(urlLang)) {
        lang = urlLang as Language;
      }

      if (lang !== this.currentLangSubject.value) {
        this.translate.use(lang);

        this.currentLangSubject.next(lang);

        this.saveToStorage('language', lang);
      }
    });
  }

  private getInitialLanguage(): Language {
    if (this.isBrowser) {
      const storedLang = this.getFromStorage('language') as Language;

      if (storedLang && ['en', 'ka'].includes(storedLang)) {
        return storedLang;
      }

      return this.getBrowserLanguage();
    }

    return 'en';
  }

  private getBrowserLanguage(): Language {
    if (this.isBrowser) {
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'ka' ? 'ka' : 'en';
    }
    return 'en';
  }

  public getCurrentLang(): Language {
    return this.currentLangSubject.value;
  }

  public getLangLabel(lang: Language): string {
    return this.languageLabels[lang];
  }

  public switchLanguage(lang: Language) {
    if (lang === this.currentLangSubject.value) {
      return;
    }

    this.translate.use(lang);

    this.currentLangSubject.next(lang);

    this.saveToStorage('language', lang);

    const urlTree = this.router.parseUrl(this.router.url);
    const segments = urlTree.root.children['primary']?.segments;

    if (segments && segments.length > 0) {
      const currentUrl = this.router.url;
      const newUrl = currentUrl.replace(/^\/[^\/]+/, '/' + lang);

      this.router.navigateByUrl(newUrl, { replaceUrl: true });
    } else {
      this.router.navigate([lang], { replaceUrl: true });
    }
  }

  private saveToStorage(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }

  private getFromStorage(key: string): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    }
    return null;
  }
}
