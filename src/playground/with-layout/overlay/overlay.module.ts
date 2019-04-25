/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { OverlayRoutingModule } from './overlay-routing.module';
import { OverlayShowcaseComponent } from './overlay-showcase.component';

@NgModule({
  declarations: [
    OverlayShowcaseComponent,
  ],
  imports: [
    NbCardModule,
    NbButtonModule,
    OverlayRoutingModule,
  ],
})
export class OverlayModule {}
