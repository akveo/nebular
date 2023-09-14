/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ScrollRoutingModule } from './scroll-routing.module';
import { ScrollWindowComponent } from './scroll-window.component';

@NgModule({
  declarations: [ScrollWindowComponent],
  imports: [NbLayoutModule, NbCardModule, ScrollRoutingModule],
})
export class ScrollModule {}
