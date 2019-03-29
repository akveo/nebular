/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbIconModule } from '../icon/icon.module';
import {
  NbCardComponent,
  NbCardBodyComponent,
  NbCardFooterComponent,
  NbCardHeaderComponent,
} from './card.component';

import { NbRevealCardComponent } from './reveal-card/reveal-card.component';
import { NbFlipCardComponent } from './flip-card/flip-card.component';
import { NbCardFrontComponent, NbCardBackComponent } from './shared/shared.component';

const NB_CARD_COMPONENTS = [
  NbCardComponent,
  NbCardBodyComponent,
  NbCardFooterComponent,
  NbCardHeaderComponent,
  NbRevealCardComponent,
  NbFlipCardComponent,
  NbCardFrontComponent,
  NbCardBackComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
  ],
  declarations: [
    ...NB_CARD_COMPONENTS,
  ],
  exports: [
    ...NB_CARD_COMPONENTS,
  ],
})
export class NbCardModule { }
