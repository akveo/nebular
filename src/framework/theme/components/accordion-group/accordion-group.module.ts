/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbAccordionModule } from '../accordion';
import { NbAccordionGroupComponent } from './accordion-group.component';

@NgModule({
  imports: [CommonModule, NbAccordionModule],
  exports: [NbAccordionGroupComponent],
  declarations: [NbAccordionGroupComponent],
  providers: [],
})
export class NbAccordionGroupModule {}
