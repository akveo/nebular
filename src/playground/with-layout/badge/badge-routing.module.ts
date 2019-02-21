/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { BadgeShowcaseComponent } from './badge-showcase.component';

const routes: Route[] = [
  {
    path: 'badge-showcase.component',
    component: BadgeShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class BadgeRoutingModule {}
