/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { NbSelectAppearance } from '@nebular/theme/components/select/select.component';

type EmptyOrStatus = '' | NbComponentStatus;

@Component({
  selector: 'nb-select-interactive',
  templateUrl: './select-interactive.component.html',
  styleUrls: ['./select-interactive.component.scss'],
})
export class SelectInteractiveComponent {
  singleSelectValue = '1';
  multipleSelectValue = [ '1' ];
  disabledOptionValue = '3';

  statuses: EmptyOrStatus[] = [ '', 'primary', 'success', 'info', 'warning', 'danger' ];
  appearances: NbSelectAppearance[] = [ 'outline', 'filled', 'hero' ];

  selectedSize: NbComponentSize = 'medium';
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
  selectedShape: NbComponentShape = 'rectangle';
  shapes: NbComponentShape[] = ['rectangle', 'semi-round', 'round'];

  selectDisabledOption(): void {
    this.singleSelectValue = this.disabledOptionValue;
    this.multipleSelectValue = [this.disabledOptionValue];
  }
}
