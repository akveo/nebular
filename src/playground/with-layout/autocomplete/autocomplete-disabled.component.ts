/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './autocomplete-disabled.component.html',
  styleUrls: ['./autocomplete-disabled.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AutocompleteDisabledComponent {
  options = ['Option 1', 'Option 2', 'Option 3'];
  disabled = true;
  inputFormControl = new FormControl();

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.inputFormControl.disable();
    } else {
      this.inputFormControl.enable();
    }
  }
}
