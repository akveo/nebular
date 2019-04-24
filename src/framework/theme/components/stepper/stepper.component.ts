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
import { NB_STEPPER } from './stepper-tokens';
import { NbStepComponent } from './step.component';

export type NbStepperOrientation = 'vertical' | 'horizontal';

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
 *     // ...
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
 *   </nb-step>
 *   <nb-step label="stepLabel">
 *       <ng-template #stepLabel>
 *           <div>
 *               step number two
 *           </div>
 *       </ng-template>
 *       // ... step content here
 *   </nb-step>
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
 *   </nb-step>
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
 * stepper-step-text-color:
 * stepper-step-text-font-family:
 * stepper-step-text-font-size:
 * stepper-step-text-font-weight:
 * stepper-step-text-line-height:
 * stepper-step-active-text-color:
 * stepper-step-completed-text-color:
 * stepper-step-index-border-color:
 * stepper-step-index-border-style:
 * stepper-step-index-border-width:
 * stepper-step-index-border-radius:
 * stepper-step-index-width:
 * stepper-step-index-active-border-color:
 * stepper-step-index-completed-background-color:
 * stepper-step-index-completed-border-color:
 * stepper-step-index-completed-text-color:
 * stepper-connector-background-color:
 * stepper-connector-completed-background-color:
 * stepper-horizontal-connector-margin:
 * stepper-vertical-connector-margin:
 * stepper-step-content-padding:
 */
@Component({
  selector: 'nb-stepper',
  styleUrls: ['./stepper.component.scss'],
  templateUrl: './stepper.component.html',
  providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent }],
})
export class NbStepperComponent {

  /**
   * Selected step index
   */
  @Input()
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    if (!this.steps) {
      this._selectedIndex = index;
      return;
    }

    this.markCurrentStepInteracted();
    if (this.canBeSelected(index)) {
      this._selectedIndex = index;
    }
  }
  protected _selectedIndex: number = 0;

  /**
   * Disables navigation by clicking on steps. False by default
   * @param {boolean} value
   */
  @Input()
  set disableStepNavigation(value: boolean) {
    this._disableStepNavigation = convertToBoolProperty(value);
  }
  get disableStepNavigation(): boolean {
    return this._disableStepNavigation;
  }
  protected _disableStepNavigation: boolean = false;

  /**
   * Selected step component
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
   */
  @Input() orientation: NbStepperOrientation = 'horizontal';

  /**
   * Allow moving forward only if the current step is complete
   * @default true
   */
  @Input()
  set linear(value: boolean) {
    this._linear = convertToBoolProperty(value);
  }
  get linear(): boolean {
    return this._linear;
  }
  protected _linear = true;

  @HostBinding('class.vertical')
  get vertical() {
    return this.orientation === 'vertical';
  }
  @HostBinding('class.horizontal')
  get horizontal() {
    return this.orientation === 'horizontal';
  }

  @ContentChildren(NbStepComponent) steps: QueryList<NbStepComponent>;

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
    this._selectedIndex = 0;
    this.steps.forEach(step => step.reset());
  }

  isStepSelected(step: NbStepComponent) {
    return this.selected === step;
  }

  protected isStepValid(index: number): boolean {
    return this.steps.toArray()[index].completed;
  }

  protected canBeSelected(indexToCheck: number): boolean {
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

  protected markCurrentStepInteracted() {
    if (this.selected) {
      this.selected.interacted = true;
    }
  }
}
