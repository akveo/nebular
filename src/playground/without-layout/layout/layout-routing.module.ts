/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { LayoutColumnLeftComponent } from './layout-column-left.component';
import { LayoutFixedHeaderComponent } from './layout-fixed-header.component';
import { LayoutFooterTestComponent } from './layout-footer-test.component';
import { LayoutHeaderTestComponent } from './layout-header-test.component';
import { LayoutShowcaseComponent } from './layout-showcase.component';
import { LayoutSidebarSubheaderComponent } from './layout-sidebar-subheader.component';
import { LayoutSubheaderComponent } from './layout-subheader.component';
import { LayoutTestComponent } from './layout-test.component';
import { LayoutWFooterComponent } from './layout-w-footer.component';
import { ThemeBreakpointTestComponent } from './theme-breakpoint-test.component';
import { ThemeChangeTestComponent } from './theme-change-test.component';

const routes: Route[] = [
  {
    path: 'layout-column-left.component',
    component: LayoutColumnLeftComponent,
  },
  {
    path: 'layout-fixed-header.component',
    component: LayoutFixedHeaderComponent,
  },
  {
    path: 'layout-footer-test.component',
    component: LayoutFooterTestComponent,
  },
  {
    path: 'layout-header-test.component',
    component: LayoutHeaderTestComponent,
  },
  {
    path: 'layout-showcase.component',
    component: LayoutShowcaseComponent,
  },
  {
    path: 'layout-sidebar-subheader.component',
    component: LayoutSidebarSubheaderComponent,
  },
  {
    path: 'layout-subheader.component',
    component: LayoutSubheaderComponent,
  },
  {
    path: 'layout-test.component',
    component: LayoutTestComponent,
  },
  {
    path: 'layout-w-footer.component',
    component: LayoutWFooterComponent,
  },
  {
    path: 'theme-breakpoint-test.component',
    component: ThemeBreakpointTestComponent,
  },
  {
    path: 'theme-change-test.component',
    component: ThemeChangeTestComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class LayoutRoutingModule {}
