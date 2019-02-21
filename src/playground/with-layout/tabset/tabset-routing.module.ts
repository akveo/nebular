/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import {
  RouteTabsetShowcaseChild1Component,
  RouteTabsetShowcaseChild2Component,
} from './components/route-tabset-children.component';
import { RouteTabsetShowcaseComponent } from './route-tabset-showcase.component';
import { TabsetBadgeComponent } from './tabset-badge.component';
import { TabsetIconComponent } from './tabset-icon.component';
import { TabsetShowcaseComponent } from './tabset-showcase.component';
import { TabsetTestComponent } from './tabset-test.component';
import { TabsetWidthComponent } from './tabset-width.component';
import { TabsetDisabledComponent } from './tabset-disabled.component';

const routes: Route[] = [
  {
    path: 'route-tabset-showcase.component',
    component: RouteTabsetShowcaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
      {
        path: 'tab1',
        component: RouteTabsetShowcaseChild1Component,
      },
      {
        path: 'tab2',
        component: RouteTabsetShowcaseChild2Component,
      },
    ],
  },
  {
    path: 'tabset-badge.component',
    component: TabsetBadgeComponent,
  },
  {
    path: 'tabset-icon.component',
    component: TabsetIconComponent,
  },
  {
    path: 'tabset-showcase.component',
    component: TabsetShowcaseComponent,
  },
  {
    path: 'tabset-test.component',
    component: TabsetTestComponent,
  },
  {
    path: 'tabset-test.component/:tab',
    component: TabsetTestComponent,
  },
  {
    path: 'tabset-width.component',
    component: TabsetWidthComponent,
  },
  {
    path: 'tabset-disabled.component',
    component: TabsetDisabledComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TabsetRoutingModule {}
