/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbFormFieldComponent } from './form-field.component';
import { NbStartActionDirective } from './start-action.directive';
import { NbEndActionDirective } from './end-action.directive';

const COMPONENTS = [
  NbFormFieldComponent,
  NbStartActionDirective,
  NbEndActionDirective,
];

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ...COMPONENTS ],
  exports: [ ...COMPONENTS ],
})
export class NbFormFieldModule {
}
