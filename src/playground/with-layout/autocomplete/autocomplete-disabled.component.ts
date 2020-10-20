/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nb-autocomplete-disabled',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-disabled.component.html',
})
export class AutocompleteDisabledComponent {
  options = ['Option 1', 'Option 2', 'Option 3'];
  inputFormControl = new FormControl();
  disabled = false;

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.inputFormControl.disable();
    } else {
      this.inputFormControl.enable();
    }
  }
}
