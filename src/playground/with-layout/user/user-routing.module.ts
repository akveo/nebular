/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { UserShowcaseComponent } from './user-showcase.component';
import { UserSizesComponent } from './user-sizes.component';

const routes: Route[] = [
  {
    path: 'user-showcase.component',
    component: UserShowcaseComponent,
  },
  {
    path: 'user-sizes.component',
    component: UserSizesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class UserRoutingModule {}
