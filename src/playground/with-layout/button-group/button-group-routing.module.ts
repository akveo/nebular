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
import { ButtonAndButtonToggleGroupsComponent } from './button-and-button-toggle-groups.component';
import { ButtonGroupInteractiveComponent } from './button-group-interactive.component';
import { ButtonGroupDisabledComponent } from './button-group-disabled.component';
import { ButtonGroupStatusesComponent } from './button-group-statuses.component';

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
    path: 'button-and-button-toggle-groups.component',
    component: ButtonAndButtonToggleGroupsComponent,
  },
  {
    path: 'button-group-interactive.component',
    component: ButtonGroupInteractiveComponent,
  },
  {
    path: 'button-group-disabled.component',
    component: ButtonGroupDisabledComponent,
  },
  {
    path: 'button-group-statuses.component',
    component: ButtonGroupStatusesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ButtonGroupRoutingModule {}
