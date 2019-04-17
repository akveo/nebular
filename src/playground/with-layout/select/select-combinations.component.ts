/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { NbSelectAppearance } from '@nebular/theme/components/select/select.component';

type EmptyOrStatus = '' | NbComponentStatus;

@Component({
  selector: 'nb-select-interactive',
  templateUrl: './select-combinations.component.html',
  styleUrls: ['./select-combinations.component.scss'],
})
export class SelectCombinationsComponent {
  singleSelectValue = '1';
  multipleSelectValue = [ '1' ];
  statuses: EmptyOrStatus[] = [ '', 'primary', 'success', 'info', 'warning', 'danger' ];
  appearances: NbSelectAppearance[] = [ 'outline', 'filled', 'hero' ];
}
