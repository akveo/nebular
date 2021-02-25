/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-for-business',
  template: `
    <div class="left">
      <h2 [attr.id]="headingId" class="heading h1 text-control">Nebular for business</h2>
      <button (click)="openDialog()" class="submit" nbButton status="control">Submit</button>
    </div>

    <div class="right">
      <p class="h6 offerings-title">
        If you use Nebular for business,
        <span class="offerings-title-second-line">we'd like to offer you:</span>
      </p>

      <ul class="offerings">
        <li class="offering text-hint" *ngFor="let offering of offerings">{{ offering }}</li>
      </ul>
    </div>
  `,
  exportAs: 'ngdForBusiness',
  styleUrls: ['./for-business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdForBusinessComponent {
  readonly headingId: string = 'ngd-for-business-heading';

  offerings: string[] = [
    'A custom template development',
    'Developers, designers, analytics, QA, PM & marketing',
    'Nebular customization services',
    'The review of your project',
  ];

  openDialog() {

  }
}
