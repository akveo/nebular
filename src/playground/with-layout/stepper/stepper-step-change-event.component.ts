import { Component } from '@angular/core';
import { NbStepChangedEvent } from '@nebular/theme';

@Component({
  templateUrl: './stepper-step-change-event.component.html',
  styleUrls: ['./stepper-step-change-event.component.scss'],
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
