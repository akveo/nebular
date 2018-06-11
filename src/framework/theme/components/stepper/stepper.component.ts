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
import {NbStepComponent} from './/step.component';

/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 * If step label is string you can pass it as `label` attribute. Otherwise `nbStepLabel` directive should be used:
 * ```html
 * // ...
 * <nb-horizontal-stepper>
 *   <nb-step label="step number one">
 *       // ... step content here
 *   <nb-step>
 *   <nb-step>
 *       <ng-template nbStepLabel>
 *           <div>
 *               step number tree
 *           </div>
 *       </ng-template>
 *       // ... step content here
 *   <nb-step>
 * </nb-horizontal-stepper>
 * ```
 * Enable `[linear]="true"` and specify `[stepControl]="form"` and user can navigates only if submit previous step.
 * ```html
 * // ...
 * <nb-horizontal-stepper [linear]="true">
 *   <nb-step label="step number one" [stepControl]="form">
 *     <form [formGroup]="form">
 *       // ...
 *     </form>
 *   <nb-step>
 *    // ...
 * </nb-horizontal-stepper>
 * ```
 *
 * @stacked-example(Validation, stepper/stepper-validation.component)
 *
 * Stepper component has two layout options. Both `nb-horizontal-stepper` and `nb-vertical-stepper` have the same API.
 * @stacked-example(Vertical, stepper/stepper-vertical.component)
 *
 * @styles
 *
 * stepper-index-size:
 * stepper-label-font-size:
 * stepper-label-font-weight:
 * stepper-accent-color:
 * stepper-completed-fg:
 * stepper-fg:
 * stepper-completed-icon-size:
 * stepper-completed-icon-weight:
 */
@Component({
  selector: 'nb-stepper',
  template: '<ng-template><ng-content></ng-content></ng-template>',
})
export class NbStepperComponent {

  @ContentChildren(NbStepComponent) _steps: QueryList<NbStepComponent>;

  /**
   * Selected step index
   *
   * @type {boolean}
   */
  @Input()
  get selectedIndex() {
    return this._selectedIndex;
  }

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

  /**
   * Selected step component
   *
   * @type {boolean}
   */
  @Input()
  get selected(): NbStepComponent {
    return this._steps ? this._steps.toArray()[this.selectedIndex] : undefined;
  }

  set selected(step: NbStepComponent) {
    this.selectedIndex = this._steps ? this._steps.toArray().indexOf(step) : -1;
  }

  /**
   * If true then stepper requires the user to complete previous step before navigate to following steps.
   *
   * @type {boolean}
   */
  @Input()
  get linear(): boolean {
    return this._linear;
  }

  set linear(value: boolean) {
    this._linear = value;
  }

  private _linear = false;

  /**
   * Navigate to next step
   * */
  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
  }

  /**
   * Navigate to previous step
   * */
  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }

  /**
   * Reset stepper and stepControls to initial state
   * */
  reset() {
    this.selectedIndex = 0;
    this._steps.forEach(step => step.reset());
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
