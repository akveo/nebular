/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAlertModule, NbCardModule } from '@nebular/theme';
import { AlertRoutingModule } from './alert-routing.module';
import { AlertAccentsComponent } from './alert-accents.component';
import { AlertColorsComponent } from './alert-colors.component';
import { AlertOutlineComponent } from './alert-outline.component';
import { AlertShowcaseComponent } from './alert-showcase.component';
import { AlertSizesComponent } from './alert-sizes.component';
import { AlertTestComponent } from './alert-test.component';

@NgModule({
  declarations: [
    AlertAccentsComponent,
    AlertColorsComponent,
    AlertOutlineComponent,
    AlertShowcaseComponent,
    AlertSizesComponent,
    AlertTestComponent,
  ],
  imports: [CommonModule, NbAlertModule, NbCardModule, AlertRoutingModule],
})
export class AlertModule {}
