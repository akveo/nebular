/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import {
  NbCardComponent,
  NbCardBodyComponent,
  NbCardFooterComponent,
  NbCardHeaderComponent,
} from './card.component';

const NB_CARD_COMPONENTS = [
  NbCardComponent,
  NbCardBodyComponent,
  NbCardFooterComponent,
  NbCardHeaderComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    ...NB_CARD_COMPONENTS,
  ],
  exports: [
    ...NB_CARD_COMPONENTS,
  ],
})
export class NbCardModule { }
