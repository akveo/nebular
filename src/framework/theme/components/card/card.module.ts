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
  NbCardAccentComponent,
} from './card.component';

import { NbRevealCardComponent } from './reveal-card/reveal-card.component';
import { NbFlipCardComponent } from './flip-card/flip-card.component';

const NB_CARD_COMPONENTS = [
  NbCardComponent,
  NbCardBodyComponent,
  NbCardFooterComponent,
  NbCardHeaderComponent,
  NbCardAccentComponent,
  NbRevealCardComponent,
  NbFlipCardComponent,
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
