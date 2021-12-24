/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { NbSelectAppearance } from '@nebular/theme';

@Component({
  selector: 'nb-select-interactive',
  templateUrl: './select-interactive.component.html',
  styleUrls: ['./select-interactive.component.scss'],
})
export class SelectInteractiveComponent {
  singleSelectValue = '1';
  multipleSelectValue = [ '1' ];
  disabledOptionValue = '3';

  selectedSize: NbComponentSize = 'medium';
  selectedShape: NbComponentShape = 'rectangle';

  fullWidth: boolean = true;

  appearances: NbSelectAppearance[] = [ 'outline', 'filled', 'hero' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  statuses: NbComponentStatus[] = [ 'basic', 'primary', 'success', 'info', 'warning', 'danger', 'control' ];

  selectDisabledOption(): void {
    this.singleSelectValue = this.disabledOptionValue;
    this.multipleSelectValue = [this.disabledOptionValue];
  }

  toggleFullWidth(): void {
    this.fullWidth = !this.fullWidth;
  }
}
