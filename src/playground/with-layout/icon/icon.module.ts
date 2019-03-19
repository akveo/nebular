/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbIconModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { IconRoutingModule } from './icon-routing.module';
import { IconShowcaseComponent } from './icon-showcase.component';

@NgModule({
  declarations: [
    IconShowcaseComponent,
  ],
  imports: [
    CommonModule,
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    IconRoutingModule,
  ],
})
export class IconModule {}
