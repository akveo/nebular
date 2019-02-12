/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';

import { TreeGridShowcaseComponent } from './tree-grid-showcase.component';
import { TreeGridRoutingModule } from './tree-grid-routing.module';
import { SortIconComponent } from './components/sort-icon.component';
import { TreeGridSortableComponent } from './tree-grid-sortable.component';
import { TreeGridFilterableComponent } from './tree-grid-filterable.component';
import { TreeGridBasicComponent } from './tree-grid-basic.component';
import { TreeGridResponsiveComponent } from './tree-grid-responsive.component';
import { FsIconComponent } from './components/fs-icon.component';

@NgModule({
  imports: [ CommonModule, NbTreeGridModule, TreeGridRoutingModule, NbCardModule, NbInputModule ],
  declarations: [
    TreeGridShowcaseComponent,
    SortIconComponent,
    TreeGridSortableComponent,
    TreeGridFilterableComponent,
    TreeGridBasicComponent,
    TreeGridResponsiveComponent,
    FsIconComponent,
  ],
})
export class TreeGridModule {}
