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
import { NbStepHeaderComponent} from './step-header/step-header.component';

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    NbStepperComponent,
    NbStepComponent,
    NbStepperNextDirective,
    NbStepperPreviousDirective,
    NbStepHeaderComponent,
  ],
  exports: [
    NbStepperComponent,
    NbStepComponent,
    NbStepperNextDirective,
    NbStepperPreviousDirective,
    NbStepHeaderComponent,
  ],
})
export class NbStepperModule {
}
