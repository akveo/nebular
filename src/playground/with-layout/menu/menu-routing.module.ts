/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { MenuChildrenComponent } from './menu-children.component';
import { MenuShowcaseComponent } from './menu-showcase.component';

const routes: Route[] = [
  {
    path: 'menu-children.component',
    component: MenuChildrenComponent,
  },
  {
    path: 'menu-showcase.component',
    component: MenuShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class MenuRoutingModule {}
