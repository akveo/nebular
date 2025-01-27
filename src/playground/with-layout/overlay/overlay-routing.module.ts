/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { OverlayShowcaseComponent } from './overlay-showcase.component';

const routes: Route[] = [
  {
    path: 'overlay-showcase.component',
    component: OverlayShowcaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverlayRoutingModule {}
