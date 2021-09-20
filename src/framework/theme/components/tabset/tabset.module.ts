/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbPortalModule } from '../cdk/portal';

import { NbSharedModule } from '../shared/shared.module';

import { NbTabsetComponent, NbTabComponent } from './tabset.component';
import { NbBadgeModule } from '../badge/badge.module';
import { NbIconModule } from '../icon/icon.module';
import { NbTabLabelDirective } from './tab-label';

const NB_TABSET_COMPONENTS = [
  NbTabsetComponent,
  NbTabComponent,
];

const NB_TABSET_DIRECTIVES = [
  NbTabLabelDirective,
];

@NgModule({
  imports: [
    NbSharedModule,
    NbBadgeModule,
    NbIconModule,
    NbPortalModule,
  ],
  declarations: [
    ...NB_TABSET_COMPONENTS,
    ...NB_TABSET_DIRECTIVES,
  ],
  exports: [
    ...NB_TABSET_COMPONENTS,
    ...NB_TABSET_DIRECTIVES,
  ],
})
export class NbTabsetModule { }
