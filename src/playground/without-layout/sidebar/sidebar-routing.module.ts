/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { SidebarCompactedComponent } from './sidebar-compacted.component';
import { SidebarFixedComponent } from './sidebar-fixed.component';
import { SidebarOneTestComponent } from './sidebar-one-test.component';
import { SidebarRightComponent } from './sidebar-right.component';
import { SidebarShowcaseComponent } from './sidebar-showcase.component';
import { SidebarTestComponent } from './sidebar-test.component';
import { SidebarThreeTestComponent } from './sidebar-three-test.component';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { SidebarTwoTestComponent } from './sidebar-two-test.component';

const routes: Route[] = [
  {
    path: 'sidebar-compacted.component',
    component: SidebarCompactedComponent,
  },
  {
    path: 'sidebar-fixed.component',
    component: SidebarFixedComponent,
  },
  {
    path: 'sidebar-one-test.component',
    component: SidebarOneTestComponent,
  },
  {
    path: 'sidebar-right.component',
    component: SidebarRightComponent,
  },
  {
    path: 'sidebar-showcase.component',
    component: SidebarShowcaseComponent,
  },
  {
    path: 'sidebar-test.component',
    component: SidebarTestComponent,
  },
  {
    path: 'sidebar-three-test.component',
    component: SidebarThreeTestComponent,
  },
  {
    path: 'sidebar-toggle.component',
    component: SidebarToggleComponent,
  },
  {
    path: 'sidebar-two-test.component',
    component: SidebarTwoTestComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SidebarRoutingModule {}
