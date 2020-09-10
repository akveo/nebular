/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule, NbFileUploadModule } from '@nebular/theme';
import { FullWidthFileUploadShowcaseComponent } from './full-width-file-upload-showcase.component';
import { CompactFileUploadShowcaseComponent } from './compact-file-upload-showcase.component';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FullWidthFileUploadShowcaseComponent,
    CompactFileUploadShowcaseComponent,
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
