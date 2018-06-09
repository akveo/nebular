/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ContentChildren, Input,
  QueryList,
  TemplateRef,
  ViewChild,
  Inject,
  forwardRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Component intended to be used within  the `<nb-stepper>` component.
 * Container for steps
 */
@Component({
  selector: 'nb-step',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class NbStepComponent {

  @ViewChild(TemplateRef) content: TemplateRef<any>;

  @Input() stepControl: AbstractControl;

  @Input()
  get completed(): boolean {
    // TODO add control validation
    return this._completed;
  }
  set completed(value: boolean) {
    this._completed = value;
  }
  private _completed: boolean | null = null;

  @Input()
  get optional(): boolean { return this._optional; }
  set optional(value: boolean) {
    this._optional = value;
  }
  private _optional = false;

  constructor(@Inject(forwardRef(() => NbStepperComponent)) private _stepper: NbStepperComponent) { }

  select(): void {
    this._stepper.selected = this;
  }

  reset(): void {
  }

}

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
      if (this._selectedIndex != index) {
        this._selectedIndex = index;
      }
    } else {
      this._selectedIndex = index;
    }
  }
  private _selectedIndex = 0;

  @Input()
  get selected(): NbStepComponent {
    return this._steps ? this._steps.toArray()[this.selectedIndex] : undefined!;
  }
  set selected(step: NbStepComponent) {
    this.selectedIndex = this._steps ? this._steps.toArray().indexOf(step) : -1;
  }

  next() {
    this.selectedIndex += 1;
  }

  previous() {
    this.selectedIndex -= 1;
  }


}
