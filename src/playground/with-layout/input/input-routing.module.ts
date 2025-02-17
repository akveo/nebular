/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { InputColorsComponent } from './input-colors.component';
import { InputFullWidthComponent } from './input-full-width.component';
import { InputShapesComponent } from './input-shapes.component';
import { InputsShowcaseComponent } from './input-showcase.component';
import { InputSizesComponent } from './input-sizes.component';
import { InputTypesComponent } from './input-types.component';
import { InputFormComponent } from './input-form.component';
import { InputDivColorsComponent } from './input-div-colors.component';

const routes: Route[] = [
  {
    path: 'input-colors.component',
    component: InputColorsComponent,
  },
  {
    path: 'input-full-width.component',
    component: InputFullWidthComponent,
  },
  {
    path: 'input-shapes.component',
    component: InputShapesComponent,
  },
  {
    path: 'input-showcase.component',
    component: InputsShowcaseComponent,
  },
  {
    path: 'input-sizes.component',
    component: InputSizesComponent,
  },
  {
    path: 'input-types.component',
    component: InputTypesComponent,
  },
  {
    path: 'input-form.component',
    component: InputFormComponent,
  },
  {
    path: 'input-div-colors.component',
    component: InputDivColorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputRoutingModule {}
