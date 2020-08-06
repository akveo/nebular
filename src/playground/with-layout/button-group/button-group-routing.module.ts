/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ButtonGroupShowcaseComponent } from './button-group-showcase.component';
import { ButtonGroupMultipleComponent } from './button-group-multiple.component';
import { ButtonGroupSizesComponent } from './button-group-sizes.component';
import { ButtonGroupAppearancesComponent } from './button-group-appearances.component';
import { ButtonGroupShapesComponent } from './button-group-shapes.component';
import { ButtonGroupNbButtonComponent } from './button-group-nb-button.component';

const routes: Route[] = [
  {
    path: 'button-group-showcase.component',
    component: ButtonGroupShowcaseComponent,
  },
  {
    path: 'button-group-multiple.component',
    component: ButtonGroupMultipleComponent,
  },
  {
    path: 'button-group-sizes.component',
    component: ButtonGroupSizesComponent,
  },
  {
    path: 'button-group-appearances.component',
    component: ButtonGroupAppearancesComponent,
  },
  {
    path: 'button-group-shapes.component',
    component: ButtonGroupShapesComponent,
  },
  {
    path: 'button-group-nb-button.component',
    component: ButtonGroupNbButtonComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ButtonGroupRoutingModule {}
