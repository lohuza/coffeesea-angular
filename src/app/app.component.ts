import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'coffeesea';
  supportedLocales = ['en', 'ka']; // Only Georgian and English
  defaultLocale = 'en';

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    // Set available languages
    this.translate.addLangs(this.supportedLocales);

    // Set default language
    this.translate.setDefaultLang(this.defaultLocale);

    // Try to use browser language or fallback to default
    const browserLang = this.translate.getBrowserLang();
    const userLang = browserLang && this.supportedLocales.includes(browserLang)
      ? browserLang
      : this.defaultLocale;

    // Set up error handling
    this.translate.use(userLang).subscribe(
      () => console.log('Translation loaded successfully for:', userLang),
      error => {
        console.error('Error loading translations:', error);
        if (userLang !== this.defaultLocale) {
          console.log('Falling back to default language:', this.defaultLocale);
          this.translate.use(this.defaultLocale);
        }
      }
    );
  }

  ngOnInit(): void {
    // No need to check for Russian translation anymore
  }
}
