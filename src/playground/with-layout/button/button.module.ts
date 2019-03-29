/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ButtonRoutingModule } from './button-routing.module';
import { ButtonColorsComponent } from './button-colors.component';
import { ButtonFullWidthComponent } from './button-full-width.component';
import { ButtonHeroComponent } from './button-hero.component';
import { ButtonOutlineComponent } from './button-outline.component';
import { ButtonShapesComponent } from './button-shapes.component';
import { ButtonShowcaseComponent } from './button-showcase.component';
import { ButtonSizesComponent } from './button-sizes.component';
import { ButtonTypesComponent } from './button-types.component';
import { ButtonIconComponent } from './button-icon.component';

@NgModule({
  declarations: [
    ButtonColorsComponent,
    ButtonFullWidthComponent,
    ButtonHeroComponent,
    ButtonOutlineComponent,
    ButtonShapesComponent,
    ButtonShowcaseComponent,
    ButtonSizesComponent,
    ButtonTypesComponent,
    ButtonIconComponent,
  ],
  imports: [ NbCardModule, NbButtonModule, NbIconModule, ButtonRoutingModule ],
})
export class ButtonModule {}
