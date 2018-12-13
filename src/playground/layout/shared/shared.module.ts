/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDynamicToAddComponent } from './components/dynamic.component';


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
  entryComponents: [
    NbDynamicToAddComponent,
  ],
})
export class NbPlaygroundSharedModule {
}
