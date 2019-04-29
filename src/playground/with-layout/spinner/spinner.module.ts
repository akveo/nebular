/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { SpinnerRoutingModule } from './spinner-routing.module';
import { SpinnerButtonComponent } from './spinner-button.component';
import { SpinnerCardComponent } from './spinner-card.component';
import { SpinnerColorsComponent } from './spinner-colors.component';
import { SpinnerSizesComponent } from './spinner-sizes.component';
import { SpinnerTabsComponent } from './spinner-tabs.component';

@NgModule({
  declarations: [
    SpinnerButtonComponent,
    SpinnerCardComponent,
    SpinnerColorsComponent,
    SpinnerSizesComponent,
    SpinnerTabsComponent,
  ],
  imports: [
    NbSpinnerModule,
    NbCardModule,
    NbTabsetModule,
    NbButtonModule,
    SpinnerRoutingModule,
  ],
})
export class SpinnerModule {}
