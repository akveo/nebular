/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule }                 from '@angular/core';
import { RouterModule, Route}       from '@angular/router';
import { DialogResultComponent }    from '../dialog/dialog-result.component';
import { TemplateWindowComponent }  from './template-window.component';
import { WindowResultComponent }    from './window-result.component';
import { WindowShowcaseComponent }  from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';

const routes: Route[] = [
  {
    path: 'template-window.component',
    component: TemplateWindowComponent,
  },
  {
    path: 'window-showcase.component',
    component: WindowShowcaseComponent,
  },
  {
    path: 'windows-backdrop.component',
    component: WindowsBackdropComponent,
  },
  {
    path: 'windows-result.component',
    component: WindowResultComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WindowRoutingModule {}
