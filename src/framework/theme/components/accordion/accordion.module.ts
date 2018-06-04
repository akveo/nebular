/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbAccordionComponent } from './accordion.component';
import { NbExpansionPanelComponent } from './expansion-panel.component';
import { NbExpansionPanelHeaderComponent } from './expansion-panel-header.component';
import { NbExpansionPanelTitleComponent } from './expansion-panel-title.component';
import { NbExpansionPanelDescriptionComponent } from './expansion-panel-description.component';
import { NbExpansionPanelBodyComponent } from './expansion-panel-body.component';

const NB_ACCORDION_COMPONENTS = [
  NbAccordionComponent,
  NbExpansionPanelComponent,
  NbExpansionPanelHeaderComponent,
  NbExpansionPanelTitleComponent,
  NbExpansionPanelDescriptionComponent,
  NbExpansionPanelBodyComponent,
];

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [...NB_ACCORDION_COMPONENTS],
  declarations: [...NB_ACCORDION_COMPONENTS],
  providers: [],
})
export class NbAccordionModule {}
