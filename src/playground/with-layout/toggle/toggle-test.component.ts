/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-toggle-test',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle id="first"></nb-toggle>
        <nb-toggle id="second" [checked]="true"></nb-toggle>
        <nb-toggle id="disabled" [disabled]="true"></nb-toggle>
        <nb-toggle [checked]="true" [disabled]="true"></nb-toggle>
        <nb-toggle id="primary" status="primary"></nb-toggle>
        <nb-toggle id="success" status="success"></nb-toggle>
        <nb-toggle id="warning" status="warning"></nb-toggle>
        <nb-toggle id="danger" status="danger"></nb-toggle>
        <nb-toggle id="info" status="info"></nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleTestComponent {
}
