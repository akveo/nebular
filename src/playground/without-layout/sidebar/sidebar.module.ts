/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarCompactedComponent } from './sidebar-compacted.component';
import { SidebarFixedComponent } from './sidebar-fixed.component';
import { SidebarOneTestComponent } from './sidebar-one-test.component';
import { SidebarRightComponent } from './sidebar-right.component';
import { SidebarShowcaseComponent } from './sidebar-showcase.component';
import { SidebarTestComponent } from './sidebar-test.component';
import { SidebarThreeTestComponent } from './sidebar-three-test.component';
import { SidebarToggleComponent } from './sidebar-toggle.component';
import { SidebarTwoTestComponent } from './sidebar-two-test.component';

@NgModule({
  declarations: [
    SidebarCompactedComponent,
    SidebarFixedComponent,
    SidebarOneTestComponent,
    SidebarRightComponent,
    SidebarShowcaseComponent,
    SidebarTestComponent,
    SidebarThreeTestComponent,
    SidebarToggleComponent,
    SidebarTwoTestComponent,
  ],
  imports: [
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbButtonModule,
    SidebarRoutingModule,
  ],
})
export class SidebarModule {}
