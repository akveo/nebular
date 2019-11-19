import { Component } from '@angular/core';
import { NbStepChangedEvent } from '../../../framework/theme/components/stepper/stepper.component';

@Component({
  templateUrl: './stepper-step-change-event.component.html',
  styles     : [`
  button {
      margin: 0.5rem;
  }

  random-index {
      display: flex;
      align-items: center;
  }
  `],
})

export class StepperStepChangeEventComponent {
  currentStepIndex = 0;
  previousStepIndex = 0;
  randomIndex = 0;

  handleStepChange(stepperInfo: NbStepChangedEvent): void {
    this.currentStepIndex = stepperInfo.index;
    this.previousStepIndex = stepperInfo.previouslySelectedIndex;
  }

  onClick() {
    this.randomIndex = Math.floor(Math.random() * 4);
  }
}
