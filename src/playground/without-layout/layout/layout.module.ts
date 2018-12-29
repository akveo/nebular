/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { LayoutRoutingModule } from './layout-routing.module';
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

@NgModule({
  declarations: [
    LayoutColumnLeftComponent,
    LayoutFixedHeaderComponent,
    LayoutFooterTestComponent,
    LayoutHeaderTestComponent,
    LayoutShowcaseComponent,
    LayoutSidebarSubheaderComponent,
    LayoutSubheaderComponent,
    LayoutTestComponent,
    LayoutWFooterComponent,
    ThemeBreakpointTestComponent,
    ThemeChangeTestComponent,
  ],
  imports: [
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbActionsModule,
    NbCardModule,
    LayoutRoutingModule,
  ],
})
export class LayoutModule {}
