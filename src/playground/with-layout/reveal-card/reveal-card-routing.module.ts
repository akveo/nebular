/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { RevealCardAccentsComponent } from './reveal-card-accents.component';
import { RevealCardColorsComponent } from './reveal-card-colors.component';
import { RevealCardFullComponent } from './reveal-card-full.component';
import { RevealCardShowcaseComponent } from './reveal-card-showcase.component';
import { RevealCardSizesComponent } from './reveal-card-sizes.component';

const routes: Route[] = [
  {
    path: 'reveal-card-accents.component',
    component: RevealCardAccentsComponent,
  },
  {
    path: 'reveal-card-colors.component',
    component: RevealCardColorsComponent,
  },
  {
    path: 'reveal-card-full.component',
    component: RevealCardFullComponent,
  },
  {
    path: 'reveal-card-showcase.component',
    component: RevealCardShowcaseComponent,
  },
  {
    path: 'reveal-card-sizes.component',
    component: RevealCardSizesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RevealCardRoutingModule {}
