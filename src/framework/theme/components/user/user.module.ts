/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import {
  NbUserComponent,
} from './user.component';

const NB_USER_COMPONENTS = [
  NbUserComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    ...NB_USER_COMPONENTS,
  ],
  exports: [
    ...NB_USER_COMPONENTS,
  ],
})
export class NbUserModule { }
