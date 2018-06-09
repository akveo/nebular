/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';

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

  /** Template for step content. */
  @ViewChild(TemplateRef) content: TemplateRef<any>;

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
