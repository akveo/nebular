/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'compact-file-upload-multiple-component',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-compact-file-upload allowPreview multiple="true"></nb-compact-file-upload>
      </nb-card-body>
    </nb-card>`,
})
export class CompactFileUploadMultipleComponent {
}
