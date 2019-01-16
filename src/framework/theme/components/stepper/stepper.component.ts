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
 *
 * When linear mode enabled user can't move forward unless current step is complete.
 * @stacked-example(Linear, stepper/stepper-linear.component)
 *
 * Specify `[stepControl]="form"` and stepper allow go to the next step only if form is valid.
 * You can disable it via `linear` mode setting.
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
 * `disableStepNavigation` disables navigation by clicking on steps, so user can navigate only using
 * 'nbStepperPrevious' and 'nbStepperNext' buttons.
 * @stacked-example(Disabled steps navigation, stepper/stepper-disabled-step-nav.component)
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
    if (!this.steps) {
      this.index = index;
      return;
    }

    this.markCurrentStepInteracted();
    if (this.canBeSelected(index)) {
      this.index = index;
    }
  }

  /**
   * Disables navigation by clicking on steps. False by default
   * @param {boolean} value
   */
  @Input()
  set disableStepNavigation(value: boolean) {
    this.disableStepNavigationValue = convertToBoolProperty(value);
  }
  get disableStepNavigation(): boolean {
    return this.disableStepNavigationValue;
  }
  disableStepNavigationValue: boolean = false;

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
    if (!this.steps) {
      return;
    }
    this.selectedIndex = this.steps.toArray().indexOf(step);
  }

  /**
   * Stepper orientation - `horizontal`|`vertical`
   * @type {string}
   */
  @Input() orientation: string = NbStepperOrientation.HORIZONTAL;

  /**
   * Allow moving forward only if the current step is complete
   * @default true
   */
  @Input()
  set linear(value: boolean) {
    this.linearValue = convertToBoolProperty(value);
  }
  get linear(): boolean {
    return this.linearValue;
  }
  private linearValue = true;

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
    if (noSteps || indexToCheck < 0 || indexToCheck >= this.steps.length) {
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
