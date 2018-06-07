/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDynamicToAddComponent } from './dynamic.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbDynamicToAddComponent,
  ],
  declarations: [
    NbDynamicToAddComponent,
  ],
})
export class NbPlaygroundSharedModule {
}
