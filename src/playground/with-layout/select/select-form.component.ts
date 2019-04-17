/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nb-select-form',
  templateUrl: './select-form.component.html',
  styles: [`
    nb-select {
      margin-bottom: 1rem;
    }
  `],
})
export class SelectFormComponent {
  selectedItemNgModel;

  selectedItemFormControl = new FormControl();
}
