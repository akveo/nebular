/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbActionComponent, NbActionsComponent } from './actions.component';

const NB_ACTIONS_COMPONENTS = [
  NbActionComponent,
  NbActionsComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    ...NB_ACTIONS_COMPONENTS,
  ],
  exports: [
    ...NB_ACTIONS_COMPONENTS,
  ],
})
export class NbActionsModule { }
