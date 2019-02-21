/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { SimpleListShowcaseComponent } from './simple-list-showcase.component';
import { UsersListShowcaseComponent } from './users-list-showcase.component';

const routes: Route[] = [
  {
    path: 'simple-list-showcase.component',
    component: SimpleListShowcaseComponent,
  },
  {
    path: 'users-list-showcase.component',
    component: UsersListShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ListRoutingModule {}
