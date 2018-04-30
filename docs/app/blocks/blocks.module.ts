/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgdThemeModule } from '../@theme/theme.module';

import {
  NgdMainBlockComponent,
  NgdMdBLockComponent,
} from './components/';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgdThemeModule,
  ],
  declarations: [
    NgdMainBlockComponent,
    NgdMdBLockComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgdMainBlockComponent,
  ],
})
export class NgdBlocksModule {
}
