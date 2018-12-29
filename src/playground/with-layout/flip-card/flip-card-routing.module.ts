/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { FlipCardAccentsComponent } from './flip-card-accents.component';
import { FlipCardColorsComponent } from './flip-card-colors.component';
import { FlipCardFullComponent } from './flip-card-full.component';
import { FlipCardShowcaseComponent } from './flip-card-showcase.component';
import { FlipCardSizesComponent } from './flip-card-sizes.component';

const routes: Route[] = [
  {
    path: 'flip-card-accents.component',
    component: FlipCardAccentsComponent,
  },
  {
    path: 'flip-card-colors.component',
    component: FlipCardColorsComponent,
  },
  {
    path: 'flip-card-full.component',
    component: FlipCardFullComponent,
  },
  {
    path: 'flip-card-showcase.component',
    component: FlipCardShowcaseComponent,
  },
  {
    path: 'flip-card-sizes.component',
    component: FlipCardSizesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FlipCardRoutingModule {}
