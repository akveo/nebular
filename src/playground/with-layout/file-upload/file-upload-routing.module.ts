/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { FullWidthFileUploadShowcaseComponent } from './full-width-file-upload-showcase.component';
import { CompactFileUploadShowcaseComponent } from './compact-file-upload-showcase.component';

const routes: Route[] = [
  {
    path: 'full-width-file-upload-showcase.component',
    component: FullWidthFileUploadShowcaseComponent,
  },
  {
    path: 'compact-file-upload-showcase.component',
    component: CompactFileUploadShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FileUploadRoutingModule {}
