/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbContextMenuModule, NbLayoutModule, NbMenuModule, NbUserModule } from '@nebular/theme';
import { ContextMenuRoutingModule } from './context-menu-routing.module';
import { ContextMenuClickComponent } from './context-menu-click.component';
import { ContextMenuShowcaseComponent } from './context-menu-showcase.component';
import { ContextMenuTestComponent } from './context-menu-test.component';

@NgModule({
  declarations: [
    ContextMenuClickComponent,
    ContextMenuShowcaseComponent,
    ContextMenuTestComponent,
  ],
  imports: [
    NbContextMenuModule,
    NbLayoutModule,
    NbUserModule,
    NbCardModule,
    NbMenuModule.forRoot(),
    ContextMenuRoutingModule,
  ],
})
export class ContextMenuModule {}
