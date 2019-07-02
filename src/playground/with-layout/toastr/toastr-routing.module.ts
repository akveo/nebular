/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ToastrDestroyByClickComponent } from './toastr-destroy-by-click.component';
import { ToastrDurationComponent } from './toastr-duration.component';
import { ToastrIconComponent } from './toastr-icon.component';
import { ToastrPositionsComponent } from './toastr-positions.component';
import { ToastrPreventDuplicatesComponent } from './toastr-prevent-duplicates.component';
import { ToastrShowcaseComponent } from './toastr-showcase.component';
import { ToastrStatusesComponent } from './toastr-statuses.component';
import { ToastrPreventDuplicatesBehaviourComponent } from './toastr-prevent-duplicates-behaviour.component';
import { ToastrLimitComponent } from './toastr-limit.component';

const routes: Route[] = [
  {
    path: 'toastr-destroy-by-click.component',
    component: ToastrDestroyByClickComponent,
  },
  {
    path: 'toastr-duration.component',
    component: ToastrDurationComponent,
  },
  {
    path: 'toastr-icon.component',
    component: ToastrIconComponent,
  },
  {
    path: 'toastr-positions.component',
    component: ToastrPositionsComponent,
  },
  {
    path: 'toastr-prevent-duplicates.component',
    component: ToastrPreventDuplicatesComponent,
  },
  {
    path: 'toastr-prevent-duplicates-behaviour.component',
    component: ToastrPreventDuplicatesBehaviourComponent,
  },
  {
    path: 'toastr-showcase.component',
    component: ToastrShowcaseComponent,
  },
  {
    path: 'toastr-statuses.component',
    component: ToastrStatusesComponent,
  },
  {
    path: 'toastr-limit.component',
    component: ToastrLimitComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ToastrRoutingModule {}
