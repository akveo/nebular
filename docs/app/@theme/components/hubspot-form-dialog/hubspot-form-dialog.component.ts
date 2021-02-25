/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

let formContainerUniqueId = 0;

@Component({
  template: `
    <nb-card>
      <nb-card-header>
        <span>{{ title }}</span>
        <button nbButton appearance="ghost" class="close-button" (click)="closeDialog()">
          <nb-icon icon="close" pack="eva"></nb-icon>
        </button>
      </nb-card-header>
      <nb-card-body>
        <div [attr.id]="formContainerId"></div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./hubspot-form-dialog.component.scss'],
})
export class NgdHubspotFormDialogComponent implements AfterViewInit {

  private readonly defaultConfig = {
    submitButtonClass: 'hs-submit-btn btn',
    css: '',
    cssClass: 'hs-custom-form',
  };

  formContainerId: string = `hubspot-form-container-id-${formContainerUniqueId++}`;
  title: string;
  formConfig;

  constructor(protected ref: NbDialogRef<NgdHubspotFormDialogComponent>) {
  }

  ngAfterViewInit() {
    const config = { ...this.defaultConfig, ...this.formConfig };
    if (!config.target) {
      config.target = '#' + this.formContainerId;
    }

    (window as unknown as { hbspt: any }).hbspt.forms.create(config);
  }

  closeDialog(): void {
    this.ref.close();
  }
}
