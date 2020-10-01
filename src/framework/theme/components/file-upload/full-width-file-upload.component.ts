/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
} from '@angular/core';
import { NbBaseFileUploadComponent } from './base-file-upload.component';

/**
 * File Upload
 *
 * @stacked-example(File Upload, file-upload/file-upload-showcase.component)
 *
 * ### Installation
 *
 * Import `NbFileUploadModule` to your feature module.
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
 * @styles
 *
 */
@Component({
  selector: 'nb-full-width-file-upload',
  template: `
    <nb-drop-area [fullWidth]=true
                  [disabled]="disabled"
                  [accept]="accept"
                  [inputName]="inputName"
                  [multiple]="multiple"
                  (fileUpload)="handleFileUpload($event)">
    </nb-drop-area>
    <div class="files-container" *ngIf="files?.length">
      <ng-container *ngFor="let file of files">
        <nb-file-list-item [allowPreview]="allowPreview"
                           [file]="file"
                           (removeItem)="removeItem($event)">
        </nb-file-list-item>
      </ng-container>
    </div>
  `,
  styleUrls: [`./full-width-file-upload.component.scss`],
})
export class NbFullWidthFileUploadComponent extends NbBaseFileUploadComponent {
}
