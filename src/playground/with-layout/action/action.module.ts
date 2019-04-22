/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbActionsModule, NbCardModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { ActionRoutingModule } from './action-routing.module';
import { ActionBadgeComponent } from './action-badge.component';
import { ActionShowcaseComponent } from './action-showcase.component';
import { ActionSizesComponent } from './action-sizes.component';
import { ActionTestComponent } from './action-test.component';
import { ActionWidthComponent } from './action-width.component';

@NgModule({
  declarations: [
    ActionBadgeComponent,
    ActionShowcaseComponent,
    ActionSizesComponent,
    ActionTestComponent,
    ActionWidthComponent,
  ],
  imports: [
    NbActionsModule,
    NbLayoutModule,
    NbCardModule,
    NbUserModule,
    ActionRoutingModule,
    CommonModule,
  ],
})
export class ActionModule {}
