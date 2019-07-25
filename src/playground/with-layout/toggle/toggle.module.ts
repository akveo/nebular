/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbToggleModule, NbCardModule } from '@nebular/theme';
import { ToggleLabelPositionComponent } from './toggle-label-position.component';
import { ToggleRoutingModule } from './toggle-routing.module';
import { ToggleDisabledComponent } from './toggle-disabled.component';
import { ToggleShowcaseComponent } from './toggle-showcase.component';
import { ToggleStatusComponent } from './toggle-status.component';
import { ToggleTestComponent } from './toggle-test.component';

@NgModule({
  declarations: [
    ToggleDisabledComponent,
    ToggleShowcaseComponent,
    ToggleStatusComponent,
    ToggleTestComponent,
    ToggleLabelPositionComponent,
  ],
  imports: [ NbCardModule, NbToggleModule, ToggleRoutingModule ],
})
export class ToggleModule {}
