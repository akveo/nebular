/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ScrollWindowComponent } from './scroll-window.component';

const routes: Route[] = [
  {
    path: 'scroll-window.component',
    component: ScrollWindowComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ScrollRoutingModule {}
