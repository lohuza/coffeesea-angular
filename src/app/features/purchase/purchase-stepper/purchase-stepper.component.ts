import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseMachineStepComponent } from '../steps/choose-machine-step/choose-machine-step.component';
import { ChooseCoffeeStepComponent } from '../steps/choose-coffee-step/choose-coffee-step.component';
import { CheckoutStepComponent } from '../steps/checkout-step/checkout-step.component';

@Component({
  selector: 'app-purchase-stepper',
  standalone: true,
  imports: [CommonModule, ChooseMachineStepComponent, ChooseCoffeeStepComponent, CheckoutStepComponent],
  templateUrl: './purchase-stepper.component.html',
  styleUrl: './purchase-stepper.component.css'
})
export class PurchaseStepperComponent {
  // 1: Machine, 2: Coffee, 3: Checkout
  currentStep = signal(1);

  // Selected data across steps
  selectedMachine = signal<any | null>(null);

  goNext() {
    const step = this.currentStep();
    if (step < 3) this.currentStep.set(step + 1);
  }

  goBack() {
    const step = this.currentStep();
    if (step > 1) this.currentStep.set(step - 1);
  }

  onMachineSelected(machine: any) {
    this.selectedMachine.set(machine);
  }

  skipMachine() {
    // Clear any selected machine and advance to coffee step
    this.selectedMachine.set(null);
    if (this.currentStep() === 1) this.goNext();
  }
}
