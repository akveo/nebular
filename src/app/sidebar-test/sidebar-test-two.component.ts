/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-test-one',
  styles: [
    `
    :host /deep/ nb-layout-column {
      background-color: #76ecff;
    }
    `,
  ],
  template: `
    <nb-layout>

      <nb-layout-header></nb-layout-header>

      <nb-sidebar>
        Left
      </nb-sidebar>

      <nb-sidebar end fixed>
        Right
      </nb-sidebar>

      <nb-layout-footer></nb-layout-footer>

    </nb-layout>
`,
})
export class NbSidebarTestTwoComponent {
}
