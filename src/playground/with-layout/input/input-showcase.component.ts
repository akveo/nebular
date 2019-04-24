/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <input type="text" nbInput placeholder="Text field">
        <input type="text" nbInput placeholder="Disabled Text field" disabled>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})
export class InputsShowcaseComponent {}
