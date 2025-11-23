import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  private fb = new FormBuilder();

  @Output() submitted = new EventEmitter<FormGroup>();

  form: FormGroup = this.fb.group({
    companyData: this.fb.group({
      companyName: ['', Validators.required],
      identificationCode: [''],
      address: ['']
    }),
    contactPersonData: this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      email: ['', Validators.email]
    }),
    acceptTerms: [false, Validators.requiredTrue]
  });

  submittedFlag = false;

  request() {
    this.submittedFlag = true;
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }
}
