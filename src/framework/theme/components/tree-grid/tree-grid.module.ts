/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

import { NbTreeGridComponent } from './tree-grid.component';
import {
  NbCellDefDirective,
  NbCellDirective,
  NbColumnDefDirective,
  NbFooterCellDefDirective,
  NbFooterCellDirective,
  NbHeaderCellDefDirective,
  NbHeaderCellDirective,
} from './tree-grid-cell';
import {
  NbFooterRowComponent,
  NbFooterRowDefDirective,
  NbHeaderRowComponent,
  NbHeaderRowDefDirective,
  NbRowComponent,
  NbRowDefDirective,
} from './tree-grid-row';
import { NbSortDirective, NbSortHeaderDirective } from './tree-grid-sort';

const COMPONENTS = [
  // Tree Grid
  NbTreeGridComponent,

  // Template defs
  NbHeaderCellDefDirective,
  NbHeaderRowDefDirective,
  NbColumnDefDirective,
  NbCellDefDirective,
  NbRowDefDirective,
  NbFooterCellDefDirective,
  NbFooterRowDefDirective,

  // Cell directives
  NbHeaderCellDirective,
  NbCellDirective,
  NbFooterCellDirective,

  // Row directives
  NbHeaderRowComponent,
  NbRowComponent,
  NbFooterRowComponent,

  // Sort directive
  NbSortDirective,
  NbSortHeaderDirective,
];

@NgModule({
  imports: [CdkTableModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NbTreeGridModule {
}
