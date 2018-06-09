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

  // Inject stepper
  constructor() { }

  select(): void {
  }

  reset(): void {
  }

}

/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 */
@Component({
  selector: 'nb-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class NbStepperComponent {

  selectedIndex = 0;

  @ContentChildren(NbStepComponent) _steps: QueryList<NbStepComponent>;

  get selectedStep() {
    return this._steps ? this._steps.toArray()[this.selectedIndex] : undefined;
  }

  next() {
    this.selectedIndex += 1;
  }

  previous() {
    this.selectedIndex -= 1;
  }


}
