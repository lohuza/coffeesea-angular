import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/api.models';
import { LanguageRouteDirective } from '../../../shared/directives';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LanguageRouteDirective],
  templateUrl: './log-in.component.html'
})
export class LogInComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private nav = inject(NavigationService);

  loading = false;
  submitted = false;
  error: string | null = null;
  passwordVisible = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  togglePassword(): void { this.passwordVisible = !this.passwordVisible; }

  submit(): void {
    this.submitted = true;
    this.error = null;
    if (this.form.invalid) return;

    const payload: LoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.loading = true;
    this.auth.login(payload).subscribe({
      next: () => {
        this.loading = false;
        this.nav.navigateWithLang(['cabinet']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message || 'Failed to log in';
      }
    });
  }
}
