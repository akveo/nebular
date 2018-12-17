/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { MenuTestRoutingModule } from './menu-test-routing.module';
import { MenuTestComponent } from './menu-test.component';
import {
  MenuItem1Component,
  MenuItem2Component,
  MenuItem3Component,
  MenuItem31Component,
  MenuItem32Component,
  MenuItem33Component,
  MenuItem331Component,
  MenuItem332Component,
  MenuItem4Component,
} from './components/menu-children.component';

@NgModule({
  declarations: [
    MenuTestComponent,
    MenuItem1Component,
    MenuItem2Component,
    MenuItem3Component,
    MenuItem31Component,
    MenuItem32Component,
    MenuItem33Component,
    MenuItem331Component,
    MenuItem332Component,
    MenuItem4Component,
  ],
  imports: [
    NbMenuModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    MenuTestRoutingModule,
  ],
})
export class MenuTestModule {}
