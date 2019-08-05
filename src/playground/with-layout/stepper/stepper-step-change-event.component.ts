import { Component } from '@angular/core';

@Component({
  templateUrl: './stepper-step-change-event.component.html',
  styles     : [`.selected-index {
      font-size: 24px;
      font-weight: bold;
  }

  button {
      margin: 0.5rem;
  }

  .custom-index {
      display: flex;
      align-items: center;
  }
  `],
})

export class StepperStepChangeEventComponent {
  currentStep = 0;
  customIndex = 0;

  handleStepChange(index: number): void {
    this.currentStep = index;
  }

  onClick() {
    this.customIndex = Math.floor(Math.random() * 4);
  }
}
