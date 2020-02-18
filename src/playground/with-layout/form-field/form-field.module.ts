/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbFormFieldModule, NbInputModule, NbIconModule, NbButtonModule, NbCardModule } from '@nebular/theme';

import { FormFieldRoutingModule } from './form-field-routing.module';
import { FormFieldShowcaseComponent } from './form-field-showcase.component';

@NgModule({
  declarations: [
    FormFieldShowcaseComponent,
  ],
  imports: [
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    FormFieldRoutingModule,
  ],
})
export class FormFieldModule {}
