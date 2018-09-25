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
    if (this.steps) {
      if (this.index !== index && this.isStepValid(index)) {
        this.index = index;
      }
    } else {
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
    this.selectedIndex = this.steps ? this.steps.toArray().indexOf(step) : -1;
  }

  /**
   * Stepper orientation - `horizontal`|`vertical`
   * @type {string}
   */
  @Input() orientation: string = NbStepperOrientation.HORIZONTAL;

  private index = 0;

  /**
   * Navigate to next step
   * */
  next() {
    this.selectedIndex = Math.min(this.index + 1, this.steps.length - 1);
  }

  /**
   * Navigate to previous step
   * */
  previous() {
    this.selectedIndex = Math.max(this.index - 1, 0);
  }

  /**
   * Reset stepper and stepControls to initial state
   * */
  reset() {
    this.selectedIndex = 0;
    this.steps.forEach(step => step.reset());
  }

  isStepSelected(step: NbStepComponent) {
    return this.index === this.steps.toArray().indexOf(step);
  }

  private isStepValid(index: number): boolean {
    const steps = this.steps.toArray();

    steps[this.index].interacted = true;

    if (index >= this.index && index > 0) {
      const currentStep = steps[this.index];
      return currentStep.completed;
    }

    return true;
  }
}
