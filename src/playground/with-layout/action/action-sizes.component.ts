/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';

@Component({
  selector: 'nb-action-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action-sizes.component.html',
})
export class ActionSizesComponent {
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
}
