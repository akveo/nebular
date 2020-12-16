/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-md-block',
  template: `
    <nb-card *ngFor="let section of source;" [ngdFragment]="$any(section).fragment">
      <nb-card-body>
        <div [innerHtml]="$any(section).html"></div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent {

  @Input() source: string;
}
