/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { RevealCardRoutingModule } from './reveal-card-routing.module';
import { RevealCardAccentsComponent } from './reveal-card-accents.component';
import { RevealCardColorsComponent } from './reveal-card-colors.component';
import { RevealCardFullComponent } from './reveal-card-full.component';
import { RevealCardShowcaseComponent } from './reveal-card-showcase.component';
import { RevealCardSizesComponent } from './reveal-card-sizes.component';

@NgModule({
  declarations: [
    RevealCardAccentsComponent,
    RevealCardColorsComponent,
    RevealCardFullComponent,
    RevealCardShowcaseComponent,
    RevealCardSizesComponent,
  ],
  imports: [ NbCardModule, RevealCardRoutingModule ],
})
export class RevealCardModule {}
