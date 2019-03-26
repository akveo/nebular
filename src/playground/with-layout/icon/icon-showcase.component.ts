/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-icon-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-showcase.component.html',
})
export class IconShowcaseComponent {

  constructor() { }
}
