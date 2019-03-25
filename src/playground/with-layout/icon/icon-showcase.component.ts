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

  constructor() {

    // package release setup
    // update all icon components
    // migration strategy (for nebular icons, and when eva becomes default)
    // packages smoke
    // check icons in all playground components
    // do examples:
    // icon in button
    // icon prefix
    // 1. specify pack
    // 2. specify props
    // 3. custom font pack
    // 4. custom svg pack
    // 5 custom svg icon rendering
    // TODO: STATUS ICONS
  }
}
