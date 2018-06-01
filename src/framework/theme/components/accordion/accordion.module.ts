/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAccordionComponent } from './accordion.component';
import { NbAccordionTitleComponent } from './accordion-title.component';
import { NbAccordionDescriptionComponent } from './accordion-description.component';
import { NbAccordionHeaderComponent } from './accordion-header.component';
import { NbAccordionBodyComponent } from './accordion-body.component';

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
