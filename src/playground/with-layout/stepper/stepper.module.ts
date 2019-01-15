/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule, NbStepperModule } from '@nebular/theme';
import { StepperRoutingModule } from './stepper-routing.module';
import { StepperShowcaseComponent } from './stepper-showcase.component';
import { StepperTestComponent } from './stepper-test.component';
import { StepperValidationComponent } from './stepper-validation.component';
import { StepperVerticalComponent } from './stepper-vertical.component';
import { StepperDisabledStepNavComponent } from './stepper-disabled-step-nav.component';

@NgModule({
  declarations: [
    StepperShowcaseComponent,
    StepperTestComponent,
    StepperValidationComponent,
    StepperVerticalComponent,
    StepperDisabledStepNavComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    StepperRoutingModule,
  ],
})
export class StepperModule {}
