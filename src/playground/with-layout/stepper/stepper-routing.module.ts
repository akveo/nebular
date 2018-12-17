/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { StepperShowcaseComponent } from './stepper-showcase.component';
import { StepperTestComponent } from './stepper-test.component';
import { StepperValidationComponent } from './stepper-validation.component';
import { StepperVerticalComponent } from './stepper-vertical.component';

const routes: Route[] = [
  {
    path: 'stepper-showcase.component',
    component: StepperShowcaseComponent,
  },
  {
    path: 'stepper-test.component',
    component: StepperTestComponent,
  },
  {
    path: 'stepper-validation.component',
    component: StepperValidationComponent,
  },
  {
    path: 'stepper-vertical.component',
    component: StepperVerticalComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class StepperRoutingModule {}
