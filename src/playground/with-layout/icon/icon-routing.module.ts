/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { IconShowcaseComponent } from './icon-showcase.component';
import { IconColorsComponent } from './icon-colors.component';

const routes: Route[] = [
  {
    path: 'icon-showcase.component',
    component: IconShowcaseComponent,
  },
  {
    path: 'icon-colors.component',
    component: IconColorsComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class IconRoutingModule {}
