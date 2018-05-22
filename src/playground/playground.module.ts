/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbCheckboxModule, NbLayoutModule, NbPopoverModule, NbSidebarModule } from '@nebular/theme';

import { NbPlaygroundRoutingModule } from './playground-routing.module';
import { NbPlaygroundBaseComponent } from './playground-base.component';
import { NbPlaygroundLayoutComponent } from './playground-layout.component';

import { NbDynamicToAddComponent } from '../app/dynamic.component';
import { NbPopoverShowcaseComponent } from './popover/popover-showcase.component';
import { NbPopoverTemplateRefComponent } from './popover/popover-template-ref.component';
import { NbPopoverCustomComponentComponent } from './popover/popover-custom-component.component';
import { NbPopoverPlacementsComponent } from './popover/popover-placements.component';
import { NbPopoverModesComponent } from './popover/popover-modes.component';
import { NbCheckboxShowcaseComponent } from './checkbox/checkbox-showcase.component';
import { NbCheckboxStatusComponent } from './checkbox/checkbox-status.component';
import { NbCheckboxDisabledComponent } from './checkbox/checkbox-disabled.component';
import { NbLayoutShowcaseComponent } from './layout/layout-showcase.component';
import { NbLayoutWFooterComponent } from './layout/layout-w-footer.component';
import { NbLayoutFixedHeaderComponent } from './layout/layout-fixed-header.component';
import { NbLayoutColumnLeftComponent } from './layout/layout-column-left.component';
import { NbSidebarShowcaseComponent } from './sidebar/sidebar-showcase.component';
import { NbSidebarCompactedComponent } from './sidebar/sidebar-compacted.component';
import { NbSidebarRightComponent } from './sidebar/sidebar-right.component';
import { NbSidebarToggleComponent } from './sidebar/sidebar-toggle.component';
import { NbSidebarFixedComponent } from './sidebar/sidebar-fixed.component';
import { NbCardShowcaseComponent } from './card/card-showcase.component';
import { NbCardFullComponent } from './card/card-full.component';
import { NbCardColorsComponent } from './card/card-colors.component';
import { NbCardAccentsComponent } from './card/card-accents.component';
import { NbCardSizesComponent } from './card/card-sizes.component';
import { NbFlipCardShowcaseComponent } from './flip-card/flip-card-showcase.component';
import { NbFlipCardColorsComponent } from './flip-card/flip-card-colors.component';
import { NbFlipCardAccentsComponent } from './flip-card/flip-card-accents.component';
import { NbFlipCardSizesComponent } from './flip-card/filp-card-sizes.component';
import { NbFlipCardFullComponent } from './flip-card/filp-card-full.component';
import { NbRevealCardShowcaseComponent } from './reveal-card/reveal-card-showcase.component';
import { NbRevealCardColorsComponent } from './reveal-card/reveal-card-colors.component';
import { NbRevealCardAccentsComponent } from './reveal-card/reveal-card-accents.component';
import { NbRevealCardSizesComponent } from './reveal-card/reveal-card-sizes.component';
import { NbRevealCardFullComponent } from './reveal-card/reveal-card-full.component';

export const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbPopoverModule,
  NbCheckboxModule,
  NbSidebarModule,
];

export const NB_EXAMPLE_COMPONENTS = [
  NbPopoverShowcaseComponent,
  NbPopoverTemplateRefComponent,
  NbPopoverCustomComponentComponent,
  NbPopoverPlacementsComponent,
  NbPopoverModesComponent,
  NbCheckboxShowcaseComponent,
  NbCheckboxStatusComponent,
  NbCheckboxDisabledComponent,
  NbLayoutShowcaseComponent,
  NbLayoutWFooterComponent,
  NbLayoutFixedHeaderComponent,
  NbLayoutColumnLeftComponent,
  NbSidebarShowcaseComponent,
  NbSidebarCompactedComponent,
  NbSidebarRightComponent,
  NbSidebarToggleComponent,
  NbSidebarFixedComponent,
  NbCardShowcaseComponent,
  NbCardFullComponent,
  NbCardColorsComponent,
  NbCardAccentsComponent,
  NbCardSizesComponent,
  NbFlipCardShowcaseComponent,
  NbFlipCardColorsComponent,
  NbFlipCardAccentsComponent,
  NbFlipCardSizesComponent,
  NbFlipCardFullComponent,
  NbRevealCardShowcaseComponent,
  NbRevealCardColorsComponent,
  NbRevealCardAccentsComponent,
  NbRevealCardSizesComponent,
  NbRevealCardFullComponent,
];

export const NB_ENTRY_COMPONENTS = [
  NbDynamicToAddComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NbPlaygroundRoutingModule,
    ...NB_MODULES,
  ],
  exports: [
    ...NB_ENTRY_COMPONENTS,
    ...NB_EXAMPLE_COMPONENTS,
  ],
  declarations: [
    NbPlaygroundLayoutComponent,
    NbPlaygroundBaseComponent,
    ...NB_ENTRY_COMPONENTS,
    ...NB_EXAMPLE_COMPONENTS,
  ],
  entryComponents: [
    ...NB_ENTRY_COMPONENTS,
  ],
})
export class NbPlaygroundModule {
}
