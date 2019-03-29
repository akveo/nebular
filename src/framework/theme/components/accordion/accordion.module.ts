/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbIconModule } from '../icon/icon.module';
import { NbAccordionComponent } from './accordion.component';
import { NbAccordionItemComponent } from './accordion-item.component';
import { NbAccordionItemHeaderComponent } from './accordion-item-header.component';
import { NbAccordionItemBodyComponent } from './accordion-item-body.component';

const NB_ACCORDION_COMPONENTS = [
  NbAccordionComponent,
  NbAccordionItemComponent,
  NbAccordionItemHeaderComponent,
  NbAccordionItemBodyComponent,
];

@NgModule({
  imports: [CommonModule, NbIconModule],
  exports: [...NB_ACCORDION_COMPONENTS],
  declarations: [...NB_ACCORDION_COMPONENTS],
  providers: [],
})
export class NbAccordionModule {}
