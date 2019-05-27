/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-showcase.component.html',
})
export class ButtonShowcaseComponent {
}
