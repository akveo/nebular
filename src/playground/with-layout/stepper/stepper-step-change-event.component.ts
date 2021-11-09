import { Component } from '@angular/core';
import { NbStepChangeEvent } from '@nebular/theme';

@Component({
  templateUrl: './stepper-step-change-event.component.html',
  styleUrls: ['./stepper-step-change-event.component.scss'],
})
export class StepperStepChangeEventComponent {
  changeEvent: NbStepChangeEvent;

  handleStepChange(e: NbStepChangeEvent): void {
    this.changeEvent = e;
  }
}
