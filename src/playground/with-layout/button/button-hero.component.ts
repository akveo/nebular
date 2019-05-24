/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-button-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-hero.component.html',
})
export class ButtonHeroComponent {
}
