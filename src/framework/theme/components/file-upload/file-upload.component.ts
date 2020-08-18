/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  HostListener,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    <div class="form-group" (drop)="drop($event)">
      <input type="file"
             accept="image/*"
             (change)="handleFileInput($event)">
      <div class="imagePreview" *ngIf="showImagePreview()">
        <img [src]="imgUrl" alt="">
      </div>
    </div>
    <button (click)="reset()">Reset</button>
  `,
  styleUrls: [`./file-upload.component.scss`],
})
export class NbFileUploadComponent {
  filePath;
  imgUrl;

  reset() {
    this.imgUrl = null;
  }
  handleFileInput(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.previewFile(file);
  }

  @HostListener('dragover', ['$event'])
  public onDragover(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('dragleave', ['$event'])
  public onDragleave(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  public drop(event) {
    this.previewFile(event.dataTransfer.files[0]);
  }

  previewFile(file) {
    const reader: FileReader = new FileReader();
    this.filePath = file;
    reader.onload = () => this.imgUrl = reader.result;
    reader.readAsDataURL(file);
  }

  showImagePreview(): boolean {
    return this.imgUrl && this.imgUrl !== '';
  }
}
