/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbLayoutModule, NbPopoverModule, NbButtonModule } from '@nebular/theme';

import { NbPlaygroundRoutingModule } from './playground-routing.module';
import { NbPlaygroundComponent } from './playground.component';
import { NbPopoverExampleComponent, NbButtonExampleComponent } from './examples';
import { NbDynamicToAddComponent } from '../app/dynamic.component';

export const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbPopoverModule,
  NbButtonModule,
];

export const NB_EXAMPLE_COMPONENTS = [
  NbPopoverExampleComponent,
  NbButtonExampleComponent,
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
