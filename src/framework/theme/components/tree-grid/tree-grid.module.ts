/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbTableModule } from '../cdk/table';
import { NbTreeGridComponent } from './tree-grid.component';
import { NbTreeGridHeaderRowComponent, NbTreeGridRowComponent } from './tree-grid-row.component';
import { NbTreeGridCellDirective, NbTreeGridHeaderCellDirective } from './tree-grid-cell.component';
import { NbSortDirective, NbSortHeaderComponent, NbSortHeaderIconDirective } from './tree-grid-sort.component';
import { NbTreeGridDataSourceBuilder } from './data-source/tree-grid-data-source';
import { NbTreeGridSortService } from './data-source/tree-grid-sort.service';
import { NbTreeGridFilterService } from './data-source/tree-grid-filter.service';
import { NbTreeGridService } from './data-source/tree-grid.service';
import { NbTreeGridDataService } from './data-source/tree-grid-data.service';
import { NbFilterDirective, NbFilterInputDirective } from './tree-grid-filter';
import { NbTreeGridRowToggleDirective } from './tree-grid-row-toggle.directive';
import { NbTreeGridRowDefDirective } from './tree-grid-row-def.component';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import { NbTreeGridRowToggleComponent } from './tree-grid-row-toggle.component';

const COMPONENTS = [
  // Tree Grid
  NbTreeGridComponent,

  // Sort directives
  NbSortDirective,
  NbSortHeaderComponent,

  // Filter directives
  NbFilterDirective,
  NbFilterInputDirective,

  NbTreeGridRowDefDirective,
  NbTreeGridRowComponent,
  NbTreeGridHeaderRowComponent,
  NbTreeGridColumnDefDirective,
  NbTreeGridHeaderCellDirective,
  NbTreeGridCellDirective,

  NbTreeGridRowToggleDirective,
  NbTreeGridRowToggleComponent,
  NbSortHeaderIconDirective,
];

@NgModule({
  imports: [ CommonModule, NbTableModule ],
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
