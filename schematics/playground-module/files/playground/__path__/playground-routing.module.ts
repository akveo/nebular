/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { NbPlaygroundBaseComponent } from './playground-base.component';
import { NbPlaygroundLayoutComponent } from './playground-layout.component';

const routes: Route[] = [
  {
    path: '',
    component: NbPlaygroundBaseComponent,
  },
  {
    path: '',
    component: NbPlaygroundLayoutComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class NbPlaygroundRoutingModule {}
