/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbTooltipModule, NbCardModule } from '@nebular/theme';
import { TooltipRoutingModule } from './tooltip-routing.module';
import { TooltipColorsComponent } from './tooltip-colors.component';
import { TooltipPlacementsComponent } from './tooltip-placements.component';
import { TooltipShowcaseComponent } from './tooltip-showcase.component';
import { TooltipWithIconComponent } from './tooltip-with-icon.component';

@NgModule({
  declarations: [
    TooltipColorsComponent,
    TooltipPlacementsComponent,
    TooltipShowcaseComponent,
    TooltipWithIconComponent,
  ],
  imports: [ NbCardModule, NbButtonModule, NbTooltipModule, TooltipRoutingModule ],
})
export class TooltipModule {}
