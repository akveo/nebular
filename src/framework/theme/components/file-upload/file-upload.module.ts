/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbBaseFileUploadComponent } from './base-file-upload.component';
import { NbCompactFileUploadComponent } from './compact-file-upload.component';
import { NbDropAreaComponent } from './drop-area.component';
import { NbFileItemComponent } from './file-item.component';
import { NbFileListItemComponent } from './file-list-item.component';
import { NbFullWidthFileUploadComponent } from './full-width-file-upload.component';
import { NbIconModule } from '../icon/icon.module';
import { NbFileUploadService } from './service/file-upload.service';
import { NbProgressBarModule } from '../progress-bar/progress-bar.module';

@NgModule({
  imports: [
    NbSharedModule,
    NbIconModule,
    NbProgressBarModule,
  ],
  declarations: [
    NbBaseFileUploadComponent,
    NbCompactFileUploadComponent,
    NbDropAreaComponent,
    NbFileItemComponent,
    NbFileListItemComponent,
    NbFullWidthFileUploadComponent,
  ],
  exports: [
    NbBaseFileUploadComponent,
    NbCompactFileUploadComponent,
    NbDropAreaComponent,
    NbFileItemComponent,
    NbFileListItemComponent,
    NbFullWidthFileUploadComponent,
  ],
  providers: [NbFileUploadService],
})
export class NbFileUploadModule {
}
