/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { FormFieldShowcaseComponent } from './form-field-showcase.component';
import { FormFieldPasswordComponent } from './form-field-password.component';
import { FormFieldInputComponent } from './form-field-input.component';

const routes: Route[] = [
  {
    path: 'form-field-showcase.component',
    component: FormFieldShowcaseComponent,
  },
  {
    path: 'form-field-password.component',
    component: FormFieldPasswordComponent,
  },
  {
    path: 'form-field-input.component',
    component: FormFieldInputComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class FormFieldRoutingModule {}
