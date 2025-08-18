import { Directive, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLanguageRoute]',
  standalone: true,
  hostDirectives: [RouterLink]
})
export class LanguageRouteDirective implements OnInit, OnChanges, OnDestroy {
  private routerLink = inject(RouterLink);
  private navService = inject(NavigationService);
  private translationService = inject(TranslationService);
  private langSubscription!: Subscription;

  @Input() appLanguageRoute: string = '';

  ngOnInit(): void {
    this.updateRouterLink();

    this.langSubscription = this.translationService.currentLang$.subscribe(() => {
      this.updateRouterLink();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appLanguageRoute']) {
      this.updateRouterLink();
    }
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  private updateRouterLink(): void {
    const commands = this.navService.getLangRoute(this.appLanguageRoute);
    this.routerLink.routerLink = commands;
  }
}
