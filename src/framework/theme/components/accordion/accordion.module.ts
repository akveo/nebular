/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbAccordionTitleComponent,
  NbAccordionDescriptionComponent,
  NbAccordionHeaderComponent,
  NbAccordionBodyComponent,
  NbAccordionComponent,
} from './accordion.component';

const NB_ACCORDION_COMPONENTS = [
  NbAccordionTitleComponent,
  NbAccordionDescriptionComponent,
  NbAccordionHeaderComponent,
  NbAccordionBodyComponent,
  NbAccordionComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: [...NB_ACCORDION_COMPONENTS],
  declarations: [...NB_ACCORDION_COMPONENTS],
  providers: [],
})
export class NbAccordionModule {}
