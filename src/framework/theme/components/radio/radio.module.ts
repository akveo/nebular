/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbRadioComponent } from './radio.component';
import { NbRadioGroupComponent } from './radio-group.component';


@NgModule({
  imports: [],
  exports: [NbRadioComponent, NbRadioGroupComponent],
  declarations: [NbRadioComponent, NbRadioGroupComponent],
})
export class NbRadioModule {
}
