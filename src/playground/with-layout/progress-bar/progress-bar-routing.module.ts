/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ProgressBarInteractiveComponent } from './progress-bar-interactive.component';
import { ProgressBarShowcaseComponent } from './progress-bar-showcase.component';
import { ProgressBarSizeComponent } from './progress-bar-size.component';
import { ProgressBarStatusComponent } from './progress-bar-status.component';
import { ProgressBarValueComponent } from './progress-bar-value.component';

const routes: Route[] = [
  {
    path: 'progress-bar-interactive.component',
    component: ProgressBarInteractiveComponent,
  },
  {
    path: 'progress-bar-showcase.component',
    component: ProgressBarShowcaseComponent,
  },
  {
    path: 'progress-bar-size.component',
    component: ProgressBarSizeComponent,
  },
  {
    path: 'progress-bar-status.component',
    component: ProgressBarStatusComponent,
  },
  {
    path: 'progress-bar-value.component',
    component: ProgressBarValueComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ProgressBarRoutingModule {}
