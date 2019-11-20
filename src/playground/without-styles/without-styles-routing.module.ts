/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';

import { WithoutStylesComponent } from './without-styles.component';

const routes: Route[] = [
  {
    path: '',
    component: WithoutStylesComponent,
    children: [
      {
        path: 'bootstrap',
        loadChildren: () => import('./bootstrap/bootstrap.module').then(m => m.BootstrapModule),
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WithoutStylesRoutingModule {}
