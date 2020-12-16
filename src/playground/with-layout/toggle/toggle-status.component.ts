/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-status',
  template: `
    <nb-card>
      <nb-card-body class="example-items-rows">
        <nb-toggle status="basic">Basic</nb-toggle>
        <nb-toggle status="primary">Primary</nb-toggle>
        <nb-toggle status="success">Success</nb-toggle>
        <nb-toggle status="info">Info</nb-toggle>
        <nb-toggle status="warning">Warning</nb-toggle>
        <nb-toggle status="danger">Danger</nb-toggle>
        <div class="control-status-example">
          <nb-toggle status="control">Control</nb-toggle>
        </div>
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    .example-items-rows {
      align-items: center;
    }
  `],
})
export class ToggleStatusComponent {
}
