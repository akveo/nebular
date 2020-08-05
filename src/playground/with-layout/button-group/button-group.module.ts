/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbButtonModule, NbRadioModule } from '@nebular/theme';

import { ButtonGroupShowcaseComponent } from './button-group-showcase.component';
import { ButtonGroupMultipleComponent } from './button-group-multiple.component';
import { NbButtonGroupModule } from '../../../framework/theme/components/button-group/button-group.module';
import { ButtonGroupRoutingModule } from './button-group-routing.module';

@NgModule({
  declarations: [
    ButtonGroupShowcaseComponent,
    ButtonGroupMultipleComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    ButtonGroupRoutingModule,
    NbRadioModule,
    NbButtonGroupModule,
    NbCardModule,
    NbIconModule,
  ],
})
export class ButtonGroupModule {}
