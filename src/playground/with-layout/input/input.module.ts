/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule } from '@nebular/theme';
import { InputRoutingModule } from './input-routing.module';
import { InputColorsComponent } from './input-colors.component';
import { InputFullWidthComponent } from './input-full-width.component';
import { InputShapesComponent } from './input-shapes.component';
import { InputsShowcaseComponent } from './input-showcase.component';
import { InputSizesComponent } from './input-sizes.component';
import { InputTypesComponent } from './input-types.component';
import { InputFormComponent } from './input-form.component';

@NgModule({
  declarations: [
    InputColorsComponent,
    InputFullWidthComponent,
    InputShapesComponent,
    InputsShowcaseComponent,
    InputSizesComponent,
    InputTypesComponent,
    InputFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbCardModule,
    InputRoutingModule,
  ],
})
export class InputModule {}
