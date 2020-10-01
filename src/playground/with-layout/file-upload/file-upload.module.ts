/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { FullWidthFileUploadShowcaseComponent } from './full-width-file-upload-showcase.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { NbFileUploadModule } from '../../../framework/theme/components/file-upload/file-upload.module';
import { CompactFileUploadShowcaseComponent } from './compact-file-upload-showcase.component';
import { FileUploadShowcaseComponent } from './file-upload-showcase.component';
import { CompactFileUploadMultipleComponent } from './nb-compact-file-upload-multiple.component';

@NgModule({
  declarations: [
    FullWidthFileUploadShowcaseComponent,
    CompactFileUploadShowcaseComponent,
    FileUploadShowcaseComponent,
    CompactFileUploadMultipleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbFileUploadModule,
    FileUploadRoutingModule,
  ],
})
export class FileUploadModule {}
