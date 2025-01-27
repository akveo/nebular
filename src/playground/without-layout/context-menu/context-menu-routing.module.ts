/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ContextMenuClickComponent } from './context-menu-click.component';
import { ContextMenuShowcaseComponent } from './context-menu-showcase.component';
import { ContextMenuTestComponent } from './context-menu-test.component';
import { ContextMenuModesComponent } from './context-menu-modes.component';
import { ContextMenuNoopComponent } from './context-menu-noop.component';
import { ContextMenuRightClickComponent } from './context-menu-right-click.component';

const routes: Route[] = [
  {
    path: 'context-menu-click.component',
    component: ContextMenuClickComponent,
  },
  {
    path: 'context-menu-showcase.component',
    component: ContextMenuShowcaseComponent,
  },
  {
    path: 'context-menu-test.component',
    component: ContextMenuTestComponent,
  },
  {
    path: 'context-menu-modes.component',
    component: ContextMenuModesComponent,
  },
  {
    path: 'context-menu-noop.component',
    component: ContextMenuNoopComponent,
  },
  {
    path: 'context-menu-right-click.component',
    component: ContextMenuRightClickComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContextMenuRoutingModule {}
