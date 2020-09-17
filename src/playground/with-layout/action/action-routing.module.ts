/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ActionBadgeComponent } from './action-badge.component';
import { ActionShowcaseComponent } from './action-showcase.component';
import { ActionSizesComponent } from './action-sizes.component';
import { ActionTestComponent } from './action-test.component';
import { ActionWidthComponent } from './action-width.component';
import { ActionDotModeComponent } from './action-dot-mode.component';

const routes: Route[] = [
  {
    path: 'action-badge.component',
    component: ActionBadgeComponent,
  },
  {
    path: 'action-showcase.component',
    component: ActionShowcaseComponent,
  },
  {
    path: 'action-sizes.component',
    component: ActionSizesComponent,
  },
  {
    path: 'action-test.component',
    component: ActionTestComponent,
  },
  {
    path: 'action-width.component',
    component: ActionWidthComponent,
  },
  {
    path: 'action-dot-mode.component',
    component: ActionDotModeComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ActionRoutingModule {}
