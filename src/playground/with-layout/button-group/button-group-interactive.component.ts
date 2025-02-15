/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbButtonToggleAppearance, NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';

@Component({
    templateUrl: './button-group-interactive.component.html',
    styleUrls: ['./button-group-interactive.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ButtonGroupInteractiveComponent {
  appearances: NbButtonToggleAppearance[] = [ 'filled', 'outline', 'ghost' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  statuses: NbComponentStatus[] = [ 'basic', 'primary', 'success', 'info', 'warning', 'danger', 'control' ];
  sizes: NbComponentSize[] = [ 'tiny', 'small', 'medium', 'large', 'giant' ];

  selectedShape: NbComponentShape = 'rectangle';
  selectedSize: NbComponentSize = 'medium';
  multiple: boolean = true;
  disabledGroup: boolean = false;
  disabledFirstButton: boolean = false;
  disabledSecondButton: boolean = false;
  disabledThirdButton: boolean = false;
}
