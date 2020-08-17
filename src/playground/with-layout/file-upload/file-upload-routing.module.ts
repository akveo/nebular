/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { FileUploadShowcaseComponent } from './file-upload-showcase.component';

const routes: Route[] = [
  {
    path: 'file-upload-showcase.component',
    component: FileUploadShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FileUploadRoutingModule {}
