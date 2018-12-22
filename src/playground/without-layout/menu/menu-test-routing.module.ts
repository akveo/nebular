/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import {
  MenuItem1Component,
  MenuItem2Component,
  MenuItem31Component,
  MenuItem32Component,
  MenuItem331Component,
  MenuItem332Component,
  MenuItem33Component,
  MenuItem3Component,
  MenuItem4Component,
} from './components/menu-children.component';
import { MenuTestComponent } from './menu-test.component';

const routes: Route[] = [
  {
    path: 'menu-test.component',
    component: MenuTestComponent,
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full',
      },
      {
        path: '1',
        component: MenuItem1Component,
      },
      {
        path: '2',
        component: MenuItem2Component,
      },
      {
        path: '12',
        component: MenuItem1Component,
      },
      {
        path: '3',
        component: MenuItem3Component,
        children: [
          {
            path: '',
            redirectTo: '1',
            pathMatch: 'full',
          },
          {
            path: '1',
            component: MenuItem31Component,
          },
          {
            path: '2',
            component: MenuItem32Component,
          },
          {
            path: '3',
            component: MenuItem33Component,
            children: [
              {
                path: '',
                redirectTo: '1',
                pathMatch: 'full',
              },
              {
                path: '1',
                component: MenuItem331Component,
              },
              {
                path: '2',
                component: MenuItem332Component,
              },
            ],
          },
        ],
      },
      {
        path: '4',
        component: MenuItem4Component,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class MenuTestRoutingModule {}
