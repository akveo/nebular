/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-label-position',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle labelPosition="start">Label Start</nb-toggle>
        <nb-toggle labelPosition="end">Label End</nb-toggle>
        <nb-toggle labelPosition="right">Label Right</nb-toggle>
        <nb-toggle labelPosition="left">Label Left</nb-toggle>
        <nb-toggle disabled>Label Default Disabled</nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleLabelPositionComponent {
}
