/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbLayoutModule, NbPopoverModule } from '@nebular/theme';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { PopoverExampleComponent } from './examples';
import { NbDynamicToAddComponent } from '../app/dynamic.component';

export const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbPopoverModule,
];

export const NB_EXAMPLE_COMPONENTS = [
  PopoverExampleComponent,
];

export const NB_ENTRY_COMPONENTS = [
  NbDynamicToAddComponent,
];

@NgModule({
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    ...NB_MODULES,
  ],
  declarations: [
    PlaygroundComponent,
    ...NB_ENTRY_COMPONENTS,
    ...NB_EXAMPLE_COMPONENTS,
  ],
  entryComponents: [
    ...NB_ENTRY_COMPONENTS,
  ],
})
export class PlaygroundModule {
}
