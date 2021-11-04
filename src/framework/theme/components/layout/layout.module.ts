/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import {
  NbLayoutComponent,
  NbLayoutColumnComponent,
  NbLayoutFooterComponent,
  NbLayoutHeaderComponent,
} from './layout.component';

import { NbRestoreScrollTopHelper } from './restore-scroll-top.service';

import { NbLtrLayoutDirectionDirective, NbRtlLayoutDirectionDirective } from './direction.directive';

const NB_LAYOUT_COMPONENTS = [
  NbLayoutComponent,
  NbLayoutColumnComponent,
  NbLayoutFooterComponent,
  NbLayoutHeaderComponent,
  NbLtrLayoutDirectionDirective,
  NbRtlLayoutDirectionDirective,
];

const NB_LAYOUT_DIRECTIVES = [NbLtrLayoutDirectionDirective, NbRtlLayoutDirectionDirective];

@NgModule({
  imports: [NbSharedModule],
  declarations: [...NB_LAYOUT_COMPONENTS, ...NB_LAYOUT_DIRECTIVES],
  providers: [NbRestoreScrollTopHelper],
  exports: [...NB_LAYOUT_COMPONENTS, ...NB_LAYOUT_DIRECTIVES],
})
export class NbLayoutModule {}
