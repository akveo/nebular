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
import { NbBadgeModule } from '../badge/badge.module';

const NB_USER_COMPONENTS = [
  NbUserComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbBadgeModule,
  ],
  declarations: [
    ...NB_USER_COMPONENTS,
  ],
  exports: [
    ...NB_USER_COMPONENTS,
  ],
})
export class NbUserModule { }
