/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-header>
        <span>Download</span>
        <button nbButton appearance="ghost" class="close-button" (click)="closeDialog()">
          <nb-icon icon="close" pack="eva"></nb-icon>
        </button>
      </nb-card-header>
      <nb-card-body>
        <div id="hubspotDownloadForm"></div>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./download-dialog.component.scss'],
})
export class NgdDownloadDialogComponent implements AfterViewInit {

  constructor(protected ref: NbDialogRef<NgdDownloadDialogComponent>) {
  }

  ngAfterViewInit() {
    (window as unknown as { hbspt: any }).hbspt.forms.create({
      portalId: '2452262',
      formId: '0d8d709d-f487-4dd2-af4f-cdcbe3ac51ae',
      target: '#hubspotDownloadForm',
      submitButtonClass: 'hs-submit-btn btn',
      css: '',
      cssClass: 'hs-custom-form',
      redirectUrl: 'https://github.com/akveo/nebular',
    });
  }

  closeDialog(): void {
    this.ref.close();
  }
}
