/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';

@Component({
  selector: 'nb-select-sizes',
  templateUrl: './select-sizes.component.html',
})
export class SelectSizesComponent {
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
}
