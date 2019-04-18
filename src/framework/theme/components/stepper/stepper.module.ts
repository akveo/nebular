/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbStepperComponent } from './stepper.component';
import { NbStepComponent } from './step.component';
import { NbStepperNextDirective, NbStepperPreviousDirective } from './stepper-button.directive';
import { NbIconModule } from '../icon/icon.module';

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
  ],
  declarations: [
    NbStepperComponent,
    NbStepComponent,
    NbStepperNextDirective,
    NbStepperPreviousDirective,
  ],
  exports: [
    NbStepperComponent,
    NbStepComponent,
    NbStepperNextDirective,
    NbStepperPreviousDirective,
  ],
})
export class NbStepperModule {
}
