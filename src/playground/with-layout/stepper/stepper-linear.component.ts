import { Component } from '@angular/core';

@Component({
    selector: 'nb-stepper-linear',
    styleUrls: ['stepper-playground.component.scss'],
    templateUrl: './stepper-linear.component.html',
    standalone: false
})
export class StepperLinearComponent {
  linearMode = true;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }
}
