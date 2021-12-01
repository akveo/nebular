/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbRouteTab } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
      </nb-card-body>
    </nb-card>
  `,
})
export class RouteTabsetShowcaseComponent {
  tabs: NbRouteTab[] = [
    {
      title: 'Users',
      icon: 'person',
      route: './tab1',
    },
    {
      title: 'Orders',
      icon: 'paper-plane-outline',
      responsive: true,
      route: ['./tab2'],
    },
    {
      title: 'Query params',
      icon: 'flash-outline',
      responsive: true,
      disabled: false,
      route: './tab3',
      queryParams: { param1: 123456, param2: 'test' },
    },
    {
      title: 'Transaction',
      icon: 'flash-outline',
      responsive: true,
      disabled: true,
    },
  ];
}
