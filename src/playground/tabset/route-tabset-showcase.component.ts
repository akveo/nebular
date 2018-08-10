/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-route-tabset-showcase-child1',
  template: `<p>List of <strong>users</strong>.</p>`,
  styles: [`
    :host p {
      padding: 1.25rem;
    }
  `],
})
export class NbRouteTabsetShowcaseChild1Component {
}

@Component({
  selector: 'nb-route-tabset-showcase-child2',
  template: `<p>List of <strong>orders</strong>.</p>`,
  styles: [`
    :host p {
      padding: 1.25rem;
    }
  `],
})
export class NbRouteTabsetShowcaseChild2Component {
}

@Component({
  selector: 'nb-route-tabset-showcase',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-route-tabset [tabs]="tabs"></nb-route-tabset>
      </nb-card-body>
    </nb-card>

    <nb-card>
      <nb-card-body>
        <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
      </nb-card-body>
    </nb-card>
  `,
})
export class NbRouteTabsetShowcaseComponent {
  tabs: any[] = [
    {
      title: 'Users',
      icon: 'nb-person',
      route: '/tabset/route-tabset-showcase.component/tab1',
    },
    {
      title: 'Orders',
      icon: 'nb-notifications',
      responsive: true,
      route: '/tabset/route-tabset-showcase.component/tab2',
    },
  ];
}
