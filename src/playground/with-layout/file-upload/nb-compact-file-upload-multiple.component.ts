/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import {NbFileModel} from '../../../framework/theme/components/file-upload/model';

@Component({
  selector: 'compact-file-upload-multiple-component',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-compact-file-upload allowPreview multiple="true" [(ngModel)]="files"></nb-compact-file-upload>
      </nb-card-body>
    </nb-card>`,
})
export class CompactFileUploadMultipleComponent {

  _files: NbFileModel[];
  set files(files) {
    this._files = files;
  }
  get files() {
    return this._files;
  }

}
