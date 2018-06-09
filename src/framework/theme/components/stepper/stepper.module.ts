/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbStepperComponent, NbStepComponent } from './stepper.component';
import { NbStepperNext, NbStepperPrevious } from './stepper-button.directive';

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [NbStepperComponent, NbStepComponent, NbStepperNext, NbStepperPrevious],
  exports: [NbStepperComponent, NbStepComponent, NbStepperNext, NbStepperPrevious],
})
export class NbStepperModule {
}
