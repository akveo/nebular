/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-icon.component.html',
  styles: [`
    [nbButton] {
      margin-right: 0.75rem;
      margin-bottom: 1rem;
    }
  `],
})
export class ButtonIconComponent {
}
