/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';

import { FsIconComponent, TreeGridShowcaseComponent } from './tree-grid-showcase.component';
import { TreeGridRoutingModule } from './tree-grid-routing.module';
import { TreeGridSortableComponent } from './tree-grid-sortable.component';
import { TreeGridFilterableComponent } from './tree-grid-filterable.component';
import { TreeGridBasicComponent } from './tree-grid-basic.component';
import { TreeGridResponsiveComponent } from './tree-grid-responsive.component';
import { TreeGridCustomIconsComponent } from './tree-grid-custom-icons.component';
import { TreeGridDisableClickToggleComponent } from './tree-grid-disable-click-toggle.component';
import { TreeGridCustomNodeStructureComponent } from './tree-grid-custom-node-structure.component';

@NgModule({
  imports: [ CommonModule, NbTreeGridModule, TreeGridRoutingModule, NbCardModule, NbInputModule, NbIconModule ],
  declarations: [
    FsIconComponent,
    TreeGridShowcaseComponent,
    TreeGridSortableComponent,
    TreeGridFilterableComponent,
    TreeGridBasicComponent,
    TreeGridResponsiveComponent,
    TreeGridCustomIconsComponent,
    TreeGridDisableClickToggleComponent,
    TreeGridCustomNodeStructureComponent,
  ],
})
export class TreeGridModule {}
