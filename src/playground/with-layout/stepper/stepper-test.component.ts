import { Component } from '@angular/core';

@Component({
    selector: 'nb-stepper-test',
    template: `
    <nb-stepper>
      <nb-step>
        <ng-template nbStepLabel>First step</ng-template>
        <div class="step-container">
          <h3>Step content #1</h3>
          <button class="btn btn-primary" disabled nbStepperNext>prev</button>
          <button class="btn btn-primary" nbStepperNext>next</button>
        </div>
      </nb-step>
      <nb-step>
        <ng-template nbStepLabel>Second step</ng-template>
        <div class="step-container">
          <h3>Step content #2</h3>
          <button class="btn btn-primary" nbStepperPrevious>prev</button>
          <button class="btn btn-primary" nbStepperNext>next</button>
        </div>
      </nb-step>
      <nb-step label="Third step">
        <div class="step-container">
          <h3>Step content #3</h3>
          <button class="btn btn-primary" nbStepperPrevious>prev</button>
          <button class="btn btn-primary" nbStepperNext>next</button>
        </div>
      </nb-step>
      <nb-step>
        <ng-template nbStepLabel>Fourth step</ng-template>
        <div class="step-container">
          <h3>Step content #4</h3>
          <button class="btn btn-primary" nbStepperPrevious>prev</button>
          <button class="btn btn-primary" disabled nbStepperNext>next</button>
        </div>
      </nb-step>
    </nb-stepper>
  `,
    standalone: false
})
export class StepperTestComponent {
}
