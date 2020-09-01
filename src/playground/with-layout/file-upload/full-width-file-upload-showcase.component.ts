/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-file-upload-component',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-full-width-file-upload disabled allowPreview></nb-full-width-file-upload>
      </nb-card-body>
    </nb-card>`,
})
export class FullWidthFileUploadShowcaseComponent {
}
