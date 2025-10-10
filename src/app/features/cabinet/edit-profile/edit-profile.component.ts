import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CabinetUserProfileService } from '../../../core/services/cabinet/cabinet-user-profile.service';
import { EditCompanyRequest, GetCompanyData } from '../../../core/models/api.models';
import { Subject, EMPTY } from 'rxjs';
import { takeUntil, concatMap, tap, catchError, finalize } from 'rxjs/operators';
import { CabinetUserProfileEditService } from '../../../core/services/cabinet/cabinet-user-profile-edit.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private cabinetService = inject(CabinetUserProfileService);
  private cabinetEditService = inject(CabinetUserProfileEditService);
  private destroy$ = new Subject<void>();

  loading = false;
  submitted = false;
  error: string | null = null;
  success: string | null = null;

  form: FormGroup = this.fb.group({
    companyName: ['', [Validators.required]],
    identificationCode: [{ value: '', disabled: true }],
    companyPerson: this.fb.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  });

  ngOnInit(): void {
    this.loading = true;
    this.cabinetService.profile$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data) {
            this.patchForm(data);
            this.loading = false;
            this.error = null;
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.message || 'Failed to load profile';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchForm(data: GetCompanyData): void {
    this.form.patchValue({
      companyName: data.company?.name || '',
      identificationCode: data.company?.id || '',
      companyPerson: {
        id: data.companyPerson?.id || '',
        firstName: data.companyPerson?.firstName || '',
        lastName: data.companyPerson?.lastName || '',
        phoneNumber: data.companyPerson?.phoneNumber || '',
        email: data.companyPerson?.email || ''
      }
    });
  }

  submit(): void {
    this.submitted = true;
    this.error = null;
    this.success = null;

    if (this.form.invalid) return;

    const payload: EditCompanyRequest = {
      companyName: this.form.getRawValue().companyName,
      companyPerson: this.form.getRawValue().companyPerson
    } as EditCompanyRequest;

    this.loading = true;

    this.cabinetEditService.edit(payload)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => this.cabinetService.refreshUserProfile()),
        tap(() => {
          this.success = 'Changes saved successfully';
        }),
        catchError((err) => {
          this.error = err?.message || 'Failed to save changes';
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
