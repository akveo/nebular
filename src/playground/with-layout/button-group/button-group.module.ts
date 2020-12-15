/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbButtonGroupModule,
  NbRadioModule,
  NbCheckboxModule,
} from '@nebular/theme';

import { ButtonGroupShowcaseComponent } from './button-group-showcase.component';
import { ButtonGroupMultipleComponent } from './button-group-multiple.component';
import { ButtonGroupRoutingModule } from './button-group-routing.module';
import { ButtonGroupSizesComponent } from './button-group-sizes.component';
import { ButtonGroupAppearancesComponent } from './button-group-appearances.component';
import { ButtonGroupShapesComponent } from './button-group-shapes.component';
import { ButtonAndButtonToggleGroupsComponent } from './button-and-button-toggle-groups.component';
import { ButtonGroupInteractiveComponent } from './button-group-interactive.component';
import { ButtonGroupDisabledComponent } from './button-group-disabled.component';
import { ButtonGroupStatusesComponent } from './button-group-statuses.component';

@NgModule({
  declarations: [
    ButtonGroupShowcaseComponent,
    ButtonGroupMultipleComponent,
    ButtonGroupSizesComponent,
    ButtonGroupAppearancesComponent,
    ButtonGroupShapesComponent,
    ButtonAndButtonToggleGroupsComponent,
    ButtonGroupInteractiveComponent,
    ButtonGroupDisabledComponent,
    ButtonGroupStatusesComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbRadioModule,
    NbCheckboxModule,
    ButtonGroupRoutingModule,
  ],
})
export class ButtonGroupModule {}
