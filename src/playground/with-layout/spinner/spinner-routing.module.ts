/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { SpinnerButtonComponent } from './spinner-button.component';
import { SpinnerCardComponent } from './spinner-card.component';
import { SpinnerColorsComponent } from './spinner-colors.component';
import { SpinnerSizesComponent } from './spinner-sizes.component';
import { SpinnerTabsComponent } from './spinner-tabs.component';

const routes: Route[] = [
  {
    path: 'spinner-button.component',
    component: SpinnerButtonComponent,
  },
  {
    path: 'spinner-card.component',
    component: SpinnerCardComponent,
  },
  {
    path: 'spinner-colors.component',
    component: SpinnerColorsComponent,
  },
  {
    path: 'spinner-sizes.component',
    component: SpinnerSizesComponent,
  },
  {
    path: 'spinner-tabs.component',
    component: SpinnerTabsComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SpinnerRoutingModule {}
