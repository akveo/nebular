/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
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

const routes: Route[] = [
  {
    path: 'button-colors.component',
    component: ButtonColorsComponent,
  },
  {
    path: 'button-full-width.component',
    component: ButtonFullWidthComponent,
  },
  {
    path: 'button-hero.component',
    component: ButtonHeroComponent,
  },
  {
    path: 'button-outline.component',
    component: ButtonOutlineComponent,
  },
  {
    path: 'button-shapes.component',
    component: ButtonShapesComponent,
  },
  {
    path: 'button-showcase.component',
    component: ButtonShowcaseComponent,
  },
  {
    path: 'button-sizes.component',
    component: ButtonSizesComponent,
  },
  {
    path: 'button-types.component',
    component: ButtonTypesComponent,
  },
  {
    path: 'button-icon.component',
    component: ButtonIconComponent,
  },
  {
    path: 'button-interactive.component',
    component: ButtonInteractiveComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ButtonRoutingModule {}
