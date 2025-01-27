/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TreeGridShowcaseComponent } from './tree-grid-showcase.component';
import { TreeGridSortableComponent } from './tree-grid-sortable.component';
import { TreeGridFilterableComponent } from './tree-grid-filterable.component';
import { TreeGridBasicComponent } from './tree-grid-basic.component';
import { TreeGridResponsiveComponent } from './tree-grid-responsive.component';
import { TreeGridCustomIconsComponent } from './tree-grid-custom-icons.component';
import { TreeGridDisableClickToggleComponent } from './tree-grid-disable-click-toggle.component';
import { TreeGridCustomNodeStructureComponent } from './tree-grid-custom-node-structure.component';

const routes: Route[] = [
  {
    path: 'tree-grid-showcase.component',
    component: TreeGridShowcaseComponent,
  },
  {
    path: 'tree-grid-sortable.component',
    component: TreeGridSortableComponent,
  },
  {
    path: 'tree-grid-filterable.component',
    component: TreeGridFilterableComponent,
  },
  {
    path: 'tree-grid-basic.component',
    component: TreeGridBasicComponent,
  },
  {
    path: 'tree-grid-responsive.component',
    component: TreeGridResponsiveComponent,
  },
  {
    path: 'tree-grid-custom-icons.component',
    component: TreeGridCustomIconsComponent,
  },
  {
    path: 'tree-grid-disable-click-toggle.component',
    component: TreeGridDisableClickToggleComponent,
  },
  {
    path: 'tree-grid-custom-node-structure.component',
    component: TreeGridCustomNodeStructureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeGridRoutingModule {}
