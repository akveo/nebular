/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { FlipCardRoutingModule } from './flip-card-routing.module';
import { FlipCardAccentsComponent } from './flip-card-accents.component';
import { FlipCardColorsComponent } from './flip-card-colors.component';
import { FlipCardFullComponent } from './flip-card-full.component';
import { FlipCardShowcaseComponent } from './flip-card-showcase.component';
import { FlipCardSizesComponent } from './flip-card-sizes.component';

@NgModule({
  declarations: [
    FlipCardAccentsComponent,
    FlipCardColorsComponent,
    FlipCardFullComponent,
    FlipCardShowcaseComponent,
    FlipCardSizesComponent,
  ],
  imports: [ NbCardModule, FlipCardRoutingModule ],
})
export class FlipCardModule {}
