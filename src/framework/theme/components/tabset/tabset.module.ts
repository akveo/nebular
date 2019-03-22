/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbTabsetComponent, NbTabComponent } from './tabset.component';
import { NbBadgeModule } from '../badge/badge.module';
import { NbIconModule } from '../icon/icon.module';

const NB_TABSET_COMPONENTS = [
  NbTabsetComponent,
  NbTabComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbBadgeModule,
    NbIconModule,
  ],
  declarations: [
    ...NB_TABSET_COMPONENTS,
  ],
  exports: [
    ...NB_TABSET_COMPONENTS,
  ],
})
export class NbTabsetModule { }
