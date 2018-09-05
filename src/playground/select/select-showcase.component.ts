/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-select-showcase',
  template: `
    <nb-card>
      <nb-card-body>

        <nb-select>
          <nb-option-group title="Group 1">
            <nb-option>Option 1</nb-option>
            <nb-option>Option 2</nb-option>
            <nb-option>Option 3</nb-option>
          </nb-option-group>
          <nb-option-group title="Group 2">
            <nb-option>Option 1</nb-option>
            <nb-option>Option 2</nb-option>
            <nb-option>Option 3</nb-option>
          </nb-option-group>
          <nb-option-group title="Group 3">
            <nb-option>Option 1</nb-option>
            <nb-option>Option 2</nb-option>
            <nb-option>Option 3</nb-option>
          </nb-option-group>
        </nb-select>

      </nb-card-body>
    </nb-card>
  `,
})

export class NbSelectShowcaseComponent {
}
