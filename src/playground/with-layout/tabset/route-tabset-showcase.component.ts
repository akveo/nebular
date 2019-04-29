/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-route-tabset-showcase',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
      </nb-card-body>
    </nb-card>
  `,
})
export class RouteTabsetShowcaseComponent {
  tabs: any[] = [
    {
      title: 'Users',
      icon: 'person',
      route: './tab1',
    },
    {
      title: 'Orders',
      icon: 'paper-plane-outline',
      responsive: true,
      route: [ './tab2' ],
    },
    {
      title: 'Transaction',
      icon: 'flash-outline',
      responsive: true,
      disabled: true,
    },
  ];
}
