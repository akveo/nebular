/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TimepickerShowcaseComponent } from './timepicker-showcase.component';

const routes: Route[] = [
  {
    path: 'timepicker-showcase.component',
    component: TimepickerShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TimepickerRoutingModule {}
