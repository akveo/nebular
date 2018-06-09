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
 */
@Component({
  selector: 'nb-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
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
    this.selectedIndex += 1;
  }

  previous() {
    this.selectedIndex -= 1;
  }

  private isStepValid(index: number): boolean {
    const steps = this._steps.toArray();

    if (index >= this._selectedIndex && this._linear && index >= 0) {
      const previousStep = steps[index - 1];
      return previousStep.completed;
    }

    return true;
  }


}
