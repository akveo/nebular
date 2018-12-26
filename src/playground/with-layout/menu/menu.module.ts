/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuChildrenComponent } from './menu-children.component';
import { MenuShowcaseComponent } from './menu-showcase.component';

@NgModule({
  declarations: [
    MenuChildrenComponent,
    MenuShowcaseComponent,
  ],
  imports: [
    NbMenuModule.forRoot(),
    NbCardModule,
    MenuRoutingModule,
  ],
})
export class MenuModule {}
