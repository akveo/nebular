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

        <nb-select placeholder="Multiple" multi>
          <nb-option>None</nb-option>
          <nb-option-group title="Group 1">
            <nb-option value="Option 1">Option 1</nb-option>
            <nb-option value="Option 2">Option 2</nb-option>
            <nb-option value="Option 3">Option 3</nb-option>
          </nb-option-group>
          <nb-option-group title="Group 2">
            <nb-option value="Option 1">Option 1</nb-option>
            <nb-option value="Option 2">Option 2</nb-option>
            <nb-option value="Option 3">Option 3</nb-option>
          </nb-option-group>
          <nb-option-group title="Group 3">
            <nb-option value="Option 1">Option 1</nb-option>
            <nb-option value="Option 2">Option 2</nb-option>
            <nb-option value="Option 3">Option 3</nb-option>
          </nb-option-group>
        </nb-select>

        <nb-select placeholder="Single">
          <nb-option>None</nb-option>
          <nb-option-group title="Group 1">
            <nb-option value="Option 1">Option 1</nb-option>
            <nb-option value="Option 2">Option 2</nb-option>
            <nb-option value="Option 3">Option 3</nb-option>
          </nb-option-group>
          <nb-option-group title="Group 2">
            <nb-option value="Option 1">Option 1</nb-option>
            <nb-option value="Option 2">Option 2</nb-option>
            <nb-option value="Option 3">Option 3</nb-option>
          </nb-option-group>
          <nb-option-group title="Group 3">
            <nb-option value="Option 1">Option 1</nb-option>
            <nb-option value="Option 2">Option 2</nb-option>
            <nb-option value="Option 3">Option 3</nb-option>
          </nb-option-group>
        </nb-select>

      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    :host nb-select {
      width: 15rem;
    }
  `],
})

export class NbSelectShowcaseComponent {
}
