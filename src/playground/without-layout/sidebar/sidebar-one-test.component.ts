/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-one-test',
  styles: [
    `
    :host ::ng-deep nb-layout-column {
      background-color: #76ecff;
    }
    `,
  ],
  template: `
    <nb-layout>
      <nb-sidebar>
        Left
      </nb-sidebar>

      <nb-sidebar right>
        Right
      </nb-sidebar>
    </nb-layout>
`,
})
export class SidebarOneTestComponent {
}
