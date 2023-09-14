/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'npg-radio-disabled',
  templateUrl: './radio-disabled.component.html',
})
export class RadioDisabledComponent {
  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2', disabled: true },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4', disabled: true },
    { value: 'This is value 5', label: 'Option 5' },
  ];
  option;
}
