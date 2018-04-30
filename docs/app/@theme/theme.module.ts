/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbSidebarModule,
  NbCardModule,
} from '@nebular/theme';

import {
  NgdHeaderComponent,
  NgdHeroComponent,
  NgdIconCardComponent,
  NgdTextCardComponent,
  NgdFooterComponent,
  NgdFragmentTargetDirective,
  NgdPageTocComponent,
} from './components/';

import {
  NgdHighlightService,
  NgdTextService,
} from './services';


@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
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
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
  ],
  exports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
  ],
  providers: [
    NgdHighlightService,
    NgdTextService,
  ],
})
export class NgdThemeModule {
}
