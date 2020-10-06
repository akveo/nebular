/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbButtonModule, NbButtonToggleModule, NbButtonGroupModule } from '@nebular/theme';

import { ButtonGroupShowcaseComponent } from './button-group-showcase.component';
import { ButtonGroupMultipleComponent } from './button-group-multiple.component';
import { ButtonGroupRoutingModule } from './button-group-routing.module';
import { ButtonGroupSizesComponent } from './button-group-sizes.component';
import { ButtonGroupAppearancesComponent } from './button-group-appearances.component';
import { ButtonGroupShapesComponent } from './button-group-shapes.component';
import { ButtonGroupNbButtonComponent } from './button-group-nb-button.component';

@NgModule({
  declarations: [
    ButtonGroupShowcaseComponent,
    ButtonGroupMultipleComponent,
    ButtonGroupSizesComponent,
    ButtonGroupAppearancesComponent,
    ButtonGroupShapesComponent,
    ButtonGroupNbButtonComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbButtonToggleModule,
    ButtonGroupRoutingModule,
  ],
})
export class ButtonGroupModule {}
