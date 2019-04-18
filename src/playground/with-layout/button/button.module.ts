/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbRadioModule } from '@nebular/theme';
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
import { ButtonInteractiveComponent } from './button-interactive.component';

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
    ButtonInteractiveComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    ButtonRoutingModule,
    NbRadioModule,
  ],
})
export class ButtonModule {}
