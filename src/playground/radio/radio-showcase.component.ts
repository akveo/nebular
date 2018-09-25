/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-radio-showcase',
  template: `
    <nb-card>
      <nb-card-body>

        <nb-radio-group>
          <nb-radio
            *ngFor="let option of options"
            [value]="option.value">
            {{ option.label }}
          </nb-radio>
        </nb-radio-group>

        {{ value }}

        <nb-radio-group [(ngModel)]="value">
          <nb-radio
            *ngFor="let option of options"
            [value]="option.value">
            {{ option.label }}
          </nb-radio>
        </nb-radio-group>

      </nb-card-body>
    </nb-card>
  `,
})
export class NbRadioShowcaseComponent {
  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2' },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4' },
  ];
  value;
}
