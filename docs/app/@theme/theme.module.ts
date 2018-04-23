/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
} from '@nebular/theme';

import {
  NgdHeaderComponent,
  NgdHeroComponent,
  NgdIconCardComponent,
  NgdTextCardComponent,
  NgdFooterComponent,
} from './components/';


@NgModule({
  imports: [
    CommonModule,
    NbThemeModule,
    NbThemeModule.forRoot({
      name: 'new-docs',
    }),
    NbLayoutModule,
    NbMenuModule,
    NbTabsetModule,
    RouterModule,
  ],
  declarations: [
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    NbThemeModule,
    NbLayoutModule,
    NbMenuModule,
    NbTabsetModule,
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
  ],
})
export class NgdThemeModule {
}
