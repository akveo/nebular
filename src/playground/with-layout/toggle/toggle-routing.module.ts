/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ToggleDisabledComponent } from './toggle-disabled.component';
import { ToggleShowcaseComponent } from './toggle-showcase.component';
import { ToggleStatusComponent } from './toggle-status.component';
import { ToggleTestComponent } from './toggle-test.component';

const routes: Route[] = [
  {
    path: 'toggle-disabled.component',
    component: ToggleDisabledComponent,
  },
  {
    path: 'toggle-showcase.component',
    component: ToggleShowcaseComponent,
  },
  {
    path: 'toggle-status.component',
    component: ToggleStatusComponent,
  },
  {
    path: 'toggle-test.component',
    component: ToggleTestComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ToggleRoutingModule {}
