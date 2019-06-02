/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-types',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-types.component.html',
})
export class ButtonTypesComponent {
  onClick() {
    return false;
  }
}
