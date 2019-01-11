/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TreeGridShowcaseComponent } from './tree-grid-showcase.component';

const routes: Route[] = [
  {
    path: 'tree-grid-showcase.component',
    component: TreeGridShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TreeGridRoutingModule {}
