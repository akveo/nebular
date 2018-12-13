/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-footer-test',
  template: `
    <nb-layout>
      <nb-layout-footer fixed>
        &copy; Akveo 2017
      </nb-layout-footer>
    </nb-layout>
`,
})
export class LayoutFooterTestComponent {
}
