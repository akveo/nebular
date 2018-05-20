/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbCheckboxModule, NbLayoutModule, NbPopoverModule } from '@nebular/theme';

import { NbPlaygroundRoutingModule } from './playground-routing.module';
import { NbPlaygroundComponent } from './playground.component';

import { NbDynamicToAddComponent } from '../app/dynamic.component';
import { NbPopoverShowcaseComponent } from './popover-showcase/popover-showcase.component';
import { NbPopoverTemplateRefComponent } from './popover-template-ref/popover-template-ref.component';
import { NbPopoverCustomComponentComponent } from './popover-custom-component/popover-custom-component.component';
import { NbPopoverPlacementsComponent } from './popover-placements/popover-placements.component';
import { NbPopoverModesComponent } from './popover-modes/popover-modes.component';
import { NbCheckboxShowcaseComponent } from './checkbox-showcase/checkbox-showcase.component';
import { NbCheckboxStatusComponent } from './checkbox-status/checkbox-status.component';
import { NbCheckboxDisabledComponent } from './checkbox-disabled/checkbox-disabled.component';


export const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbPopoverModule,
  NbCheckboxModule,
];

export const NB_EXAMPLE_COMPONENTS = [
  NbPopoverShowcaseComponent,
  NbPopoverTemplateRefComponent,
  NbPopoverCustomComponentComponent,
  NbPopoverPlacementsComponent,
  NbPopoverModesComponent,
  NbCheckboxShowcaseComponent,
  NbCheckboxStatusComponent,
  NbCheckboxDisabledComponent,
];

export const NB_ENTRY_COMPONENTS = [
  NbDynamicToAddComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NbPlaygroundRoutingModule,
    ...NB_MODULES,
  ],
  exports: [
    ...NB_ENTRY_COMPONENTS,
    ...NB_EXAMPLE_COMPONENTS,
  ],
  declarations: [
    NbPlaygroundComponent,
    ...NB_ENTRY_COMPONENTS,
    ...NB_EXAMPLE_COMPONENTS,
  ],
  entryComponents: [
    ...NB_ENTRY_COMPONENTS,
  ],
})
export class NbPlaygroundModule {
}
