/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  HostListener,
} from '@angular/core';

/**
 * ...
 *
 * @stacked-example(..., file-upload/file-upload.component)
 *
 * ### Installation
 *
 * Import `NbFileUploadComponent` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbFileUploadModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * ...
 * @stacked-example(File Upload, file-upload/file-upload-showcase.component)
 *
 * @styles
 *
 * checkbox-height:
 */
@Component({
  selector: 'nb-file-upload',
  template: `
    <div class="form-group">
      <label for="file"></label>
      <input type="file"
             id="file"
             (change)="handleFileInput($event.target.files)">
    </div>
  `,
  styleUrls: [ `./file-upload.component.scss` ],
})
export class NbFileUploadComponent {
  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
  }

  @HostListener('dragover', ['$event']) public onDragover(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
  }

  @HostListener('dragleave', ['$event']) public onDragleave(event) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) public drop(event) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    console.log('drop');
  }
}
