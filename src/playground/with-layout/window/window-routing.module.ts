/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TemplateWindowComponent } from './template-window.component';
import { WindowShowcaseComponent } from './window-showcase.component';
import { WindowsBackdropComponent } from './windows-backdrop.component';
import { WindowIconComponent } from './window-icon.component';
import { WindowControlsComponent } from './window-controls.component';
import { WindowTemplateTitleComponent } from './window-template-title.component';

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
    path: 'windows-icon.component',
    component: WindowIconComponent,
  },
  {
    path: 'window-controls.component',
    component: WindowControlsComponent,
  },
  {
    path: 'window-template-title.component',
    component: WindowTemplateTitleComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class WindowRoutingModule {}
