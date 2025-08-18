import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../../core/services/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  private translationService = inject(TranslationService);

  get currentLang(): Language {
    return this.translationService.getCurrentLang();
  }

  get languages(): Language[] {
    return ['en', 'ka'];
  }

  getLanguageLabel(lang: Language): string {
    return this.translationService.getLangLabel(lang);
  }

  switchLanguage(lang: Language): void {
    this.translationService.switchLanguage(lang);
  }
}
