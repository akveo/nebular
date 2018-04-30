/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-md-block',
  template: `
    <nb-card *ngFor="let section of source">
      <a [name]="section.fragment"></a>
      <nb-card-body [innerHtml]="section.html"></nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent {

  @Input() source: string;
}
