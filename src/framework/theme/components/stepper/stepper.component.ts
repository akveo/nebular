/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ContentChildren, Input,
  QueryList,
} from '@angular/core';
import { NbStepComponent } from './/step.component';

/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 * @stacked-example(Validation, stepper/stepper-validation.component)
 *
 * @stacked-example(Vertical, stepper/stepper-vertical.component)
 *
 */
@Component({
  selector: 'nb-stepper',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class NbStepperComponent {

  @ContentChildren(NbStepComponent) _steps: QueryList<NbStepComponent>;

  @Input()
  get selectedIndex() { return this._selectedIndex; }
  set selectedIndex(index: number) {
    if (this._steps) {
      if (index < 0 || index > this._steps.length - 1) {
        throw Error('nbStepperComponent: Cannot assign out-of-bounds value to `selectedIndex`.');
      }
      if (this._selectedIndex !== index && this.isStepValid(index)) {
        this._selectedIndex = index;
      }
    } else {
      this._selectedIndex = index;
    }
  }
  private _selectedIndex = 0;

  @Input()
  get selected(): NbStepComponent {
    return this._steps ? this._steps.toArray()[this.selectedIndex] : undefined;
  }
  set selected(step: NbStepComponent) {
    this.selectedIndex = this._steps ? this._steps.toArray().indexOf(step) : -1;
  }

  @Input()
  get linear(): boolean { return this._linear; }
  set linear(value: boolean) { this._linear = value; }
  private _linear = false;

  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
  }

  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  private isStepValid(index: number): boolean {
    const steps = this._steps.toArray();

    steps[this._selectedIndex].interacted = true;

    if (index >= this._selectedIndex && index > 0) {
      const currentStep = steps[this._selectedIndex];
      return currentStep.completed;
    }

    return true;
  }

}

@Component({
  selector: 'nb-vertical-stepper',
  templateUrl: './stepper-vertical.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: NbStepperComponent, useExisting: NbVerticalStepperComponent}],
})
export class NbVerticalStepperComponent extends NbStepperComponent {

}

@Component({
  selector: 'nb-horizontal-stepper',
  templateUrl: './stepper-horizontal.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: NbStepperComponent, useExisting: NbHorizontalStepperComponent}],
})
export class NbHorizontalStepperComponent extends NbStepperComponent {

}
