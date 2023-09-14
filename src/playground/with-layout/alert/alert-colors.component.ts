/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npg-alert-colors',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert-colors.component.html',
  styleUrls: ['./alert-example.component.scss'],
})
export class AlertColorsComponent {}
