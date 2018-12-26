/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { DialogAutoFocusComponent } from './dialog-auto-focus.component';
import { DialogBackdropClickComponent } from './dialog-backdrop-click.component';
import { DialogEscComponent } from './dialog-esc.component';
import { DialogHasBackdropComponent } from './dialog-has-backdrop.component';
import { DialogResultComponent } from './dialog-result.component';
import { DialogScrollComponent } from './dialog-scroll.component';
import { DialogShowcaseComponent } from './dialog-showcase.component';
import { DialogTemplateComponent } from './dialog-template.component';

const routes: Route[] = [
  {
    path: 'dialog-auto-focus.component',
    component: DialogAutoFocusComponent,
  },
  {
    path: 'dialog-backdrop-click.component',
    component: DialogBackdropClickComponent,
  },
  {
    path: 'dialog-esc.component',
    component: DialogEscComponent,
  },
  {
    path: 'dialog-has-backdrop.component',
    component: DialogHasBackdropComponent,
  },
  {
    path: 'dialog-result.component',
    component: DialogResultComponent,
  },
  {
    path: 'dialog-scroll.component',
    component: DialogScrollComponent,
  },
  {
    path: 'dialog-showcase.component',
    component: DialogShowcaseComponent,
  },
  {
    path: 'dialog-template.component',
    component: DialogTemplateComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DialogRoutingModule {}
