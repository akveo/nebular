/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { ButtonGroupShowcaseComponent } from './button-group-showcase.component';
import { ButtonGroupMultipleComponent } from './button-group-multiple.component';

const routes: Route[] = [
  {
    path: 'button-group-showcase.component',
    component: ButtonGroupShowcaseComponent,
  },
  {
    path: 'button-group-multiple.component',
    component: ButtonGroupMultipleComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ButtonGroupRoutingModule {}
