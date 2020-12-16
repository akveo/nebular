/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <nb-card size="small">
      <nb-card-body>
        <nb-select [selected]="{ id: 1 }" [compareWith]="compareById">
          <nb-option [value]="{ id: 1 }">1</nb-option>
          <nb-option [value]="{ id: 2 }">2</nb-option>
          <nb-option [value]="{ id: 3 }">3</nb-option>
        </nb-select>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCompareWithComponent {
  compareById(v1, v2): boolean {
    return v1.id === v2.id;
  }
}
