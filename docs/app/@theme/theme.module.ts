/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbSidebarModule,
  NbCardModule,
  NbCheckboxModule,
} from '@nebular/theme';

import {
  NgdHeaderComponent,
  NgdHeroComponent,
  NgdIconCardComponent,
  NgdTextCardComponent,
  NgdFooterComponent,
  NgdFragmentTargetDirective,
  NgdPageTocComponent,
  NgdPageTabsComponent,
  NgdColorSwatchDirective,
  NgdDescriptionDirective,
} from './components/';

import {
  NgdHighlightService,
  NgdTextService,
  NgdTabbedService,
  NgdStructureService,
  NgdCodeLoaderService,
  NgdIframeCommunicatorService,
  NgdStylesService,
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
    NgdPageTabsComponent,
    NgdColorSwatchDirective,
    NgdDescriptionDirective,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbCheckboxModule,
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
    NgdPageTabsComponent,
    NgdColorSwatchDirective,
    NgdDescriptionDirective,
  ],
  providers: [
    NgdHighlightService,
    NgdTextService,
    NgdTabbedService,
    NgdStructureService,
    NgdCodeLoaderService,
    NgdIframeCommunicatorService,
    NgdStylesService,
  ],
})
export class NgdThemeModule {
}
