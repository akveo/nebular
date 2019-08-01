/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-disabled',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle disabled></nb-toggle>
        <nb-toggle [checked]="true" disabled></nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleDisabledComponent {
}
