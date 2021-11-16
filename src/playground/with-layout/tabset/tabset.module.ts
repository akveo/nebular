/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbRouteTabsetModule, NbTabsetModule } from '@nebular/theme';
import { TabsetRoutingModule } from './tabset-routing.module';
import { RouteTabsetShowcaseComponent } from './route-tabset-showcase.component';
import { TabsetBadgeComponent } from './tabset-badge.component';
import { TabsetIconComponent } from './tabset-icon.component';
import { TabsetShowcaseComponent } from './tabset-showcase.component';
import { TabsetTestComponent } from './tabset-test.component';
import { TabsetWidthComponent } from './tabset-width.component';
import {
  RouteTabsetShowcaseChild1Component,
  RouteTabsetShowcaseChild2Component,
  RouteTabsetShowcaseChild3Component,
} from './components/route-tabset-children.component';
import { TabsetDisabledComponent } from './tabset-disabled.component';
import { TabsetTemplateTitleComponent } from './tabset-template-title.component';

@NgModule({
  declarations: [
    RouteTabsetShowcaseComponent,
    TabsetBadgeComponent,
    TabsetIconComponent,
    TabsetShowcaseComponent,
    TabsetTestComponent,
    TabsetWidthComponent,
    RouteTabsetShowcaseChild1Component,
    RouteTabsetShowcaseChild2Component,
    TabsetDisabledComponent,
    RouteTabsetShowcaseChild3Component,
    TabsetTemplateTitleComponent,
  ],
  imports: [NbTabsetModule, NbRouteTabsetModule, NbCardModule, TabsetRoutingModule],
})
export class TabsetModule {}
