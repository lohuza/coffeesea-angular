import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CabinetLocationsService } from '../../../core/services/cabinet/cabinet-locations.service';
import {Subject, EMPTY, Observable, map} from 'rxjs';
import { catchError, concatMap, finalize, takeUntil, tap } from 'rxjs/operators';
import { Location } from '../../../core/models/api.models';

@Component({
  selector: 'app-cabinet-locations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private locationsService = inject(CabinetLocationsService);
  private destroy$ = new Subject<void>();

  loading = false;
  submitted = false;
  error: string | null = null;
  success: string | null = null;

  locations$!: Observable<Location[]>;

  form: FormGroup = this.fb.group({
    address: ['', [Validators.required]]
  });

  editingId: string | null = null;
  editForm: FormGroup = this.fb.group({
    address: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.locations$ = this.locationsService.getLocations()
      .pipe(
        map(locations => locations.sort((a, b) => a.address.localeCompare(b.address))),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refreshList(): void {
    this.locations$ = this.locationsService.getLocations();
  }

  startEdit(loc: Location): void {
    this.error = null;
    this.success = null;
    this.editingId = loc.id;
    this.editForm.reset({ address: loc.address || '' });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (!this.editingId) return;
    if (this.editForm.invalid) return;

    const id = this.editingId;
    const address = this.editForm.get('address')?.value as string;

    this.loading = true;
    this.locationsService.edit(id, address)
      .pipe(
        takeUntil(this.destroy$),
        concatMap(() => this.locationsService.getLocations()),
        tap(() => {
          this.success = 'Location updated';
          this.cancelEdit();
        }),
        tap(() => this.refreshList()),
        catchError((err) => {
          this.error = err?.message || 'Failed to update location';
          return EMPTY;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe();
  }

  deleteLocation(loc: Location): void {
    if (!loc?.id) return;
    // Optional confirmation to prevent accidental deletions
    const ok = confirm('Delete this location?');
    if (!ok) return;

    this.error = null;
    this.success = null;
    this.loading = true;

    this.locationsService.delete(loc.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.success = 'Location deleted'),
        tap(() => this.refreshList()),
        catchError((err) => {
          this.error = err?.message || 'Failed to delete location';
          return EMPTY;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe();
  }

  addLocation(): void {
    this.submitted = true;
    this.error = null;
    this.success = null;

    if (this.form.invalid) return;

    const address = this.form.get('address')?.value as string;

    this.loading = true;
    this.locationsService.add(address)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.success = 'Location added';
          this.form.reset();
          this.submitted = false;
        }),
        tap(() => this.refreshList()),
        catchError((err) => {
          this.error = err?.message || 'Failed to add location';
          return EMPTY;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe();
  }
}
