/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ContentChildren, HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NbStepComponent } from './step.component';

export enum NbStepperOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 * ### Installation
 *
 * Import `NbStepperModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbStepperModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If step label is string you can pass it as `label` attribute. Otherwise ng-template should be used:
 * ```html
 * // ...
 * <nb-stepper orientation="horizontal">
 *   <nb-step label="step number one">
 *       // ... step content here
 *   <nb-step>
 *   <nb-step label="stepLabel">
 *       <ng-template #stepLabel>
 *           <div>
 *               step number two
 *           </div>
 *       </ng-template>
 *       // ... step content here
 *   <nb-step>
 * </nb-stepper>
 * ```
 * Specify `[stepControl]="form"` and user can navigates only if submit previous step's form.
 * ```html
 * // ...
 * <nb-stepper  orientation="horizontal">
 *   <nb-step label="step number one" [stepControl]="form">
 *     <form [formGroup]="form">
 *       // ...
 *     </form>
 *   <nb-step>
 *    // ...
 * </nb-stepper>
 * ```
 *
 * @stacked-example(Validation, stepper/stepper-validation.component)
 *
 * Stepper component has two layout options - `vertical` & `horizontal`
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
  styleUrls: ['./stepper.component.scss'],
  templateUrl: './stepper.component.html',
})
export class NbStepperComponent {

  @ContentChildren(NbStepComponent) steps: QueryList<NbStepComponent>;

  @HostBinding('class.vertical')
  get vertical() {
    return this.orientation === NbStepperOrientation.VERTICAL;
  }

  @HostBinding('class.horizontal')
  get horizontal() {
    return this.orientation === NbStepperOrientation.HORIZONTAL;
  }

  /**
   * Selected step index
   *
   * @type {boolean}
   */
  @Input()
  get selectedIndex() {
    return this.index;
  }

  set selectedIndex(index: number) {
    this.markCurrentStepInteracted();
    if (this.canBeSelected(index)) {
      this.index = index;
    }
  }

  /**
   * Selected step component
   *
   * @type {boolean}
   */
  @Input()
  get selected(): NbStepComponent | undefined {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
  }

  set selected(step: NbStepComponent) {
    this.selectedIndex = this.steps.toArray().indexOf(step);
  }

  /**
   * Stepper orientation - `horizontal`|`vertical`
   * @type {string}
   */
  @Input() orientation: string = NbStepperOrientation.HORIZONTAL;

  /**
   * In linear mode, stepper allows moving forward only if the current step is complete
   * @default false
   */
  @Input()
  set linear(value: boolean) {
    this.linearValue = convertToBoolProperty(value);
  }
  get linear(): boolean {
    return this.linearValue;
  }
  private linearValue = false;

  private index = 0;

  /**
   * Navigate to next step
   * */
  next() {
    this.selectedIndex = Math.min(this.selectedIndex + 1, this.steps.length - 1);
  }

  /**
   * Navigate to previous step
   * */
  previous() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  }

  /**
   * Reset stepper and stepControls to initial state
   * */
  reset() {
    this.index = 0;
    this.steps.forEach(step => step.reset());
  }

  isStepSelected(step: NbStepComponent) {
    return this.selected === step;
  }

  private isStepValid(index: number): boolean {
    return this.steps.toArray()[index].completed;
  }

  private canBeSelected(indexToCheck: number): boolean {
    const noSteps = !this.steps || this.steps.length === 0;
    const outsideOfRange = indexToCheck < 0 || indexToCheck >= this.steps.length;
    if (noSteps || outsideOfRange) {
      return false;
    }

    if (indexToCheck <= this.selectedIndex || !this.linear) {
      return true;
    }

    let isAllStepsValid = true;
    for (let i = this.selectedIndex; i < indexToCheck; i++) {
      if (!this.isStepValid(i)) {
        isAllStepsValid = false;
        break;
      }
    }
    return isAllStepsValid;
  }

  private markCurrentStepInteracted() {
    if (this.selected) {
      this.selected.interacted = true;
    }
  }
}
