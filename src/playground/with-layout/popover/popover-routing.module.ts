/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { PopoverCustomComponentComponent } from './popover-custom-component.component';
import { PopoverModesComponent } from './popover-modes.component';
import { PopoverPlacementsComponent } from './popover-placements.component';
import { PopoverShowcaseComponent } from './popover-showcase.component';
import { PopoverTemplateRefComponent } from './popover-template-ref.component';
import { PopoverTestComponent } from './popover-test.component';

const routes: Route[] = [
  {
    path: 'popover-custom-component.component',
    component: PopoverCustomComponentComponent,
  },
  {
    path: 'popover-modes.component',
    component: PopoverModesComponent,
  },
  {
    path: 'popover-placements.component',
    component: PopoverPlacementsComponent,
  },
  {
    path: 'popover-showcase.component',
    component: PopoverShowcaseComponent,
  },
  {
    path: 'popover-template-ref.component',
    component: PopoverTemplateRefComponent,
  },
  {
    path: 'popover-test.component',
    component: PopoverTestComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PopoverRoutingModule {}
