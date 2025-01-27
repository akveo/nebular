/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbFormFieldModule,
  NbInputModule,
  NbIconModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
} from '@nebular/theme';

import { FormFieldRoutingModule } from './form-field-routing.module';
import { FormFieldShowcaseComponent } from './form-field-showcase.component';
import { FormFieldPasswordComponent } from './form-field-password.component';
import { FormFieldInputComponent } from './form-field-input.component';

@NgModule({
  declarations: [FormFieldShowcaseComponent, FormFieldPasswordComponent, FormFieldInputComponent],
  imports: [
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    FormFieldRoutingModule,
    CommonModule,
  ],
})
export class FormFieldModule {}
