/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbMenuModule } from '@nebular/theme';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuChildrenComponent } from './menu-children.component';
import { MenuShowcaseComponent } from './menu-showcase.component';
import { MenuAutoCollapseComponent } from './menu-autocollapse.component';
import { MenuLinkParamsComponent } from './menu-link-params.component';
import {
  MenuServiceItem1Component,
  MenuServiceItem2Component,
  MenuServiceItem3Component,
  MenuServiceItem31Component,
  MenuServiceItem32Component,
  MenuServiceItem33Component,
  MenuServiceItem331Component,
  MenuServiceItem332Component,
} from './menu-service-children';
import { MenuServiceComponent } from './menu-service.component';
import { MenuBadgeComponent } from './menu-badge.component';

@NgModule({
  declarations: [
    MenuChildrenComponent,
    MenuShowcaseComponent,
    MenuAutoCollapseComponent,
    MenuLinkParamsComponent,
    MenuServiceItem1Component,
    MenuServiceItem2Component,
    MenuServiceItem3Component,
    MenuServiceItem31Component,
    MenuServiceItem32Component,
    MenuServiceItem33Component,
    MenuServiceItem331Component,
    MenuServiceItem332Component,
    MenuServiceComponent,
    MenuBadgeComponent,
  ],
  imports: [NbMenuModule.forRoot(), NbCardModule, MenuRoutingModule, NbButtonModule],
})
export class MenuModule {}
