/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { RadioDisabledComponent } from './radio-disabled.component';
import { RadioShowcaseComponent } from './radio-showcase.component';
import { RadioStatusesComponent } from './radio-statuses.component';
import { RadioDisabledGroupComponent } from './radio-disabled-group.component';
import { RadioFormComponent } from './radio-form.component';

const routes: Route[] = [
  {
    path: 'radio-disabled.component',
    component: RadioDisabledComponent,
  },
  {
    path: 'radio-showcase.component',
    component: RadioShowcaseComponent,
  },
  {
    path: 'radio-statuses.component',
    component: RadioStatusesComponent,
  },
  {
    path: 'radio-disabled-group.component',
    component: RadioDisabledGroupComponent,
  },
  {
    path: 'radio-form.component',
    component: RadioFormComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RadioRoutingModule {}
