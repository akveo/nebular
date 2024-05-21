/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { NgdHubspotFormDialogComponent } from '../hubspot-form-dialog/hubspot-form-dialog.component';

@Component({
  selector: 'ngd-for-business',
  template: `
    <div class="left">
      <h2 [attr.id]="headingId" class="heading h1 text-control">Nebular for business</h2>
      <button (click)="openDialog()" class="submit" nbButton status="control">Submit your request</button>
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
    'The services of developers, designers, analytics, QAs, PMs & marketing specialists;',
    'Nebular customization services;',
    'The review of your project.',
  ];

  constructor(private dialogService: NbDialogService) {
  }

  openDialog(): void {
    const context = {
      title: 'Nebular for business',
      formConfig: {
        portalId: '2452262',
        formId: '40c56c10-9b41-4d12-95dd-e6c186ac4273',
      },
    };

    this.dialogService.open(NgdHubspotFormDialogComponent, { context });
  }
}
