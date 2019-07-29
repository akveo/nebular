/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { CardAccentsComponent } from './card-accents.component';
import { CardColorsComponent } from './card-colors.component';
import { CardFullComponent } from './card-full.component';
import { CardShowcaseComponent } from './card-showcase.component';
import { CardSizesComponent } from './card-sizes.component';
import { CardTestComponent } from './card-test.component';
import { CardWithoutBodyComponent } from './card-without-body.component';
import { CardSizesCombinationsComponent } from './card-sizes-combinations.component';

const routes: Route[] = [
  {
    path: 'card-accents.component',
    component: CardAccentsComponent,
  },
  {
    path: 'card-colors.component',
    component: CardColorsComponent,
  },
  {
    path: 'card-full.component',
    component: CardFullComponent,
  },
  {
    path: 'card-showcase.component',
    component: CardShowcaseComponent,
  },
  {
    path: 'card-sizes.component',
    component: CardSizesComponent,
  },
  {
    path: 'card-test.component',
    component: CardTestComponent,
  },
  {
    path: 'card-without-body.component',
    component: CardWithoutBodyComponent,
  },
  {
    path: 'card-sizes-combinations.component',
    component: CardSizesCombinationsComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class CardRoutingModule {}
