/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import {NbFileModel} from '../../../framework/theme/components/file-upload/model';

@Component({
  selector: 'nb-file-upload-component',
  templateUrl: './file-upload-showcase.component.html',
})
export class FileUploadShowcaseComponent {

  _files: NbFileModel[];
  set files(files) {
    this._files = files;
  }
  get files() {
    return this._files;
  }

}
