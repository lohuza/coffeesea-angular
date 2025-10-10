import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { SignInRequest } from '../../../core/models/api.models';
import { LanguageRouteDirective } from '../../../shared/directives';
import { NavigationService } from '../../../core/services/navigation.service';

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pwd && confirm && pwd !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, LanguageRouteDirective],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private nav = inject(NavigationService);

  loading = false;
  submitted = false;
  error: string | null = null;

  form: FormGroup = this.fb.group({
    companyData: this.fb.group({
      companyName: ['', [Validators.required]],
      identificationCode: ['', [Validators.required]],
      address: ['']
    }),
    contactPersonData: this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }),
    passwordRequest: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: matchPasswords }),
    acceptTerms: [false, [Validators.requiredTrue]]
  });

  get password() { return (this.form.get('passwordRequest') as FormGroup).controls; }

  submit(): void {
    this.submitted = true;
    this.error = null;
    if (this.form.invalid) return;

    const payload: SignInRequest = {
      companyData: this.form.value.companyData,
      contactPersonData: this.form.value.contactPersonData,
      passwordRequest: this.form.value.passwordRequest
    } as SignInRequest;

    console.log('Payload', payload);

    this.loading = true;
    this.auth.signIn(payload).subscribe({
      next: () => {
        this.loading = false;
        this.nav.navigateWithLang(['cabinet']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.message || 'Failed to sign in';
      }
    });
  }
}
