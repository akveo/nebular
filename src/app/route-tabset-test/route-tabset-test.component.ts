/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-route-tabset-test-child1',
  template: `<h1>Child 1</h1>`,
})
export class NbRouteTabsetTestChild1Component {
}

@Component({
  selector: 'nb-route-tabset-test-child2',
  template: `<h1>Child 2</h1>`,
})
export class NbRouteTabsetTestChild2Component {
}

@Component({
  selector: 'nb-route-tabset-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-route-tabset [tabs]="tabs"></nb-route-tabset>
        <nb-route-tabset [tabs]="tabs" fullWidth></nb-route-tabset>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbRouteTabsetTestComponent {
  tabs: any[] = [
    {
      title: 'Tab #1',
      route: '/route-tabset/tab1',
    },
    {
      title: 'Tab #2',
      route: '/route-tabset/tab2',
    },
  ];
}
