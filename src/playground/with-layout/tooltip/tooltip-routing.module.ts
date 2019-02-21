/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TooltipColorsComponent } from './tooltip-colors.component';
import { TooltipPlacementsComponent } from './tooltip-placements.component';
import { TooltipShowcaseComponent } from './tooltip-showcase.component';
import { TooltipWithIconComponent } from './tooltip-with-icon.component';

const routes: Route[] = [
  {
    path: 'tooltip-colors.component',
    component: TooltipColorsComponent,
  },
  {
    path: 'tooltip-placements.component',
    component: TooltipPlacementsComponent,
  },
  {
    path: 'tooltip-showcase.component',
    component: TooltipShowcaseComponent,
  },
  {
    path: 'tooltip-with-icon.component',
    component: TooltipWithIconComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TooltipRoutingModule {}
