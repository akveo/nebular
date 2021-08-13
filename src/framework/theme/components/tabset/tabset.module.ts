/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { NbSharedModule } from '../shared/shared.module';

import { NbTabsetComponent, NbTabComponent } from './tabset.component';
import { NbBadgeModule } from '../badge/badge.module';
import { NbIconModule } from '../icon/icon.module';
import { NbTabContentDirective } from './tab-content';

const NB_TABSET_COMPONENTS = [
  NbTabsetComponent,
  NbTabComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbBadgeModule,
    NbIconModule,
    PortalModule,
  ],
  declarations: [
    ...NB_TABSET_COMPONENTS,
    NbTabContentDirective,
  ],
  exports: [
    ...NB_TABSET_COMPONENTS,
    NbTabContentDirective,
  ],
})
export class NbTabsetModule { }
