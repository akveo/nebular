/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { MenuChildrenComponent } from './menu-children.component';
import { MenuShowcaseComponent } from './menu-showcase.component';
import { MenuAutoCollapseComponent } from './menu-autocollapse.component';
import { MenuLinkParamsComponent } from './menu-link-params.component';
import {
  MenuServiceItem1Component,
  MenuServiceItem2Component,
  MenuServiceItem31Component,
  MenuServiceItem32Component,
  MenuServiceItem331Component,
  MenuServiceItem332Component,
  MenuServiceItem33Component,
  MenuServiceItem3Component,
} from './menu-service-children';
import { MenuServiceComponent } from './menu-service.component';
import { MenuBadgeComponent } from './menu-badge.component';

const routes: Route[] = [
  {
    path: 'menu-children.component',
    component: MenuChildrenComponent,
  },
  {
    path: 'menu-showcase.component',
    component: MenuShowcaseComponent,
  },
  {
    path: 'menu-autocollapse.component',
    component: MenuAutoCollapseComponent,
  },
  {
    path: 'menu-link-params.component',
    component: MenuLinkParamsComponent,
  },
  {
    path: 'menu-badge.component',
    component: MenuBadgeComponent,
  },
  {
    path: 'menu-service.component',
    component: MenuServiceComponent,
    children: [
      {
        path: '2',
        component: MenuServiceItem2Component,
      },
      {
        path: '3',
        component: MenuServiceItem3Component,
        children: [
          {
            path: '1',
            component: MenuServiceItem31Component,
          },
          {
            path: '2',
            component: MenuServiceItem32Component,
          },
          {
            path: '3',
            component: MenuServiceItem33Component,
            children: [
              {
                path: '1',
                component: MenuServiceItem331Component,
              },
              {
                path: '2',
                component: MenuServiceItem332Component,
              },
            ],
          },
        ],
      },
      {
        path: '',
        component: MenuServiceItem1Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
