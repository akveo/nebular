/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { TypographyShowcaseComponent } from './typography-showcase.component';

const routes: Route[] = [
  {
    path: 'typography-showcase.component',
    component: TypographyShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TypographyRoutingModule {}
