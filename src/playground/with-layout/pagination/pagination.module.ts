/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbPaginationModule,
} from '@beast/theme';
import { PaginationRoutingModule } from './pagination-routing.module';
import { PaginationShowcaseComponent } from './pagination-showcase.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginationShowcaseComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbFormFieldModule,
    FormsModule,
    NbPaginationModule,
    PaginationRoutingModule,
  ],
})
export class PaginationModule {}
