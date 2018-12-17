/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { AlertAccentsComponent } from './alert-accents.component';
import { AlertColorsComponent } from './alert-colors.component';
import { AlertOutlineComponent } from './alert-outline.component';
import { AlertShowcaseComponent } from './alert-showcase.component';
import { AlertSizesComponent } from './alert-sizes.component';
import { AlertTestComponent } from './alert-test.component';

const routes: Route[] = [
  {
    path: 'alert-accents.component',
    component: AlertAccentsComponent,
  },
  {
    path: 'alert-colors.component',
    component: AlertColorsComponent,
  },
  {
    path: 'alert-outline.component',
    component: AlertOutlineComponent,
  },
  {
    path: 'alert-showcase.component',
    component: AlertShowcaseComponent,
  },
  {
    path: 'alert-sizes.component',
    component: AlertSizesComponent,
  },
  {
    path: 'alert-test.component',
    component: AlertTestComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class AlertRoutingModule {}
