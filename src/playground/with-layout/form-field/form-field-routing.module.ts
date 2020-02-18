/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { FormFieldShowcaseComponent } from './form-field-showcase.component';

const routes: Route[] = [
  {
    path: 'form-field-showcase.component',
    component: FormFieldShowcaseComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FormFieldRoutingModule {}
