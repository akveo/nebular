import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <nb-stepper orientation="horizontal" disableStepNavigation>
          <nb-step [label]="labelOne">
            <ng-template #labelOne>First step</ng-template>
            <h3>Step content #1</h3>
            <button class="prev-button" nbButton disabled nbStepperNext>prev</button>
            <button class="next-button" nbButton nbStepperNext>next</button>
          </nb-step>
          <nb-step [label]="labelTwo">
            <ng-template #labelTwo>Second step</ng-template>
            <h3>Step content #2</h3>
            <button class="prev-button" nbButton nbStepperPrevious>prev</button>
            <button class="next-button" nbButton nbStepperNext>next</button>
          </nb-step>
          <nb-step label="Third step">
            <h3>Step content #3</h3>
            <button class="prev-button" nbButton nbStepperPrevious>prev</button>
            <button class="next-button" nbButton nbStepperNext>next</button>
          </nb-step>
          <nb-step [label]="labelFour">
            <ng-template #labelFour>Fourth step</ng-template>
            <h3>Step content #4</h3>
            <button class="prev-button" nbButton nbStepperPrevious>prev</button>
            <button class="next-button" nbButton disabled nbStepperNext>next</button>
          </nb-step>
        </nb-stepper>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./stepper-disabled-step-nav.component.scss'],
})
export class StepperDisabledStepNavComponent {}
