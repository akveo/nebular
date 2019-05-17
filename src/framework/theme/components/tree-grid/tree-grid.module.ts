/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbTableModule } from '../cdk/table/table.module';
import { NbIconModule } from '../icon/icon.module';
import { NbTreeGridComponent } from './tree-grid.component';
import {
  NbTreeGridCellDefDirective,
  NbTreeGridFooterCellDefDirective,
  NbTreeGridFooterRowDefDirective,
  NbTreeGridHeaderCellDefDirective,
  NbTreeGridHeaderRowDefDirective,
  NbTreeGridRowDefDirective,
} from './tree-grid-def.component';
import {
  NbTreeGridFooterRowComponent,
  NbTreeGridHeaderRowComponent,
  NbTreeGridRowComponent,
} from './tree-grid-row.component';
import {
  NbTreeGridCellDirective,
  NbTreeGridFooterCellDirective,
  NbTreeGridHeaderCellDirective,
} from './tree-grid-cell.component';
import {
  NbSortDirective,
  NbSortHeaderComponent,
  NbSortHeaderIconDirective,
  NbSortIconComponent,
} from './tree-grid-sort.component';
import { NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NbTreeGridSortService } from './data-source/tree-grid-sort.service';
import { NbTreeGridFilterService } from './data-source/tree-grid-filter.service';
import { NbTreeGridService } from './data-source/tree-grid.service';
import { NbTreeGridDataService } from './data-source/tree-grid-data.service';
import { NbFilterDirective, NbFilterInputDirective } from './tree-grid-filter';
import { NbTreeGridRowToggleDirective } from './tree-grid-row-toggle.directive';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import { NbTreeGridRowToggleComponent } from './tree-grid-row-toggle.component';

const COMPONENTS = [
  // Tree Grid
  NbTreeGridComponent,

  NbTreeGridRowDefDirective,
  NbTreeGridRowComponent,
  NbTreeGridCellDefDirective,
  NbTreeGridCellDirective,

  NbTreeGridHeaderRowDefDirective,
  NbTreeGridHeaderRowComponent,
  NbTreeGridHeaderCellDefDirective,
  NbTreeGridHeaderCellDirective,

  NbTreeGridFooterRowDefDirective,
  NbTreeGridFooterRowComponent,
  NbTreeGridFooterCellDefDirective,
  NbTreeGridFooterCellDirective,

  NbTreeGridColumnDefDirective,

  // Sort directives
  NbSortDirective,
  NbSortHeaderComponent,
  NbSortIconComponent,

  // Filter directives
  NbFilterDirective,
  NbFilterInputDirective,

  NbTreeGridRowToggleDirective,
  NbTreeGridRowToggleComponent,
  NbSortHeaderIconDirective,
];

@NgModule({
  imports: [ CommonModule, NbTableModule, NbIconModule ],
  declarations: [ ...COMPONENTS ],
  exports: [ NbTableModule, ...COMPONENTS ],
  providers: [
    NbTreeGridSortService,
    NbTreeGridFilterService,
    NbTreeGridService,
    NbTreeGridDataService,
    NbTreeGridDataSourceBuilder,
  ],
})
export class NbTreeGridModule {}
