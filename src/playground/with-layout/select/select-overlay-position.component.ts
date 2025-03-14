/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbPosition } from '../../../framework/theme/components/cdk/overlay/overlay-position';

@Component({
  template: `
    <nb-card size="small">
      <nb-card-body>
        <nb-select [selected]="1" [optionsOverlayPosition]="NbPosition.BOTTOM_END" [optionsWidth]="350">
          <nb-option [value]="1">Testing Label</nb-option>
          <nb-option [value]="2">Testing really long label</nb-option>
          <nb-option [value]="3">Testing really extreme long label</nb-option>
        </nb-select>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOverlayPositionComponent {
  protected readonly NbPosition = NbPosition;
}
