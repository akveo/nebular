/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbPlaygroundBaseComponent } from './playground-base.component';
import { NbPlaygroundLayoutComponent } from './playground-layout.component';

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
import { NbFlipCardSizesComponent } from './flip-card/flip-card-sizes.component';
import { NbFlipCardFullComponent } from './flip-card/flip-card-full.component';
import { NbRevealCardShowcaseComponent } from './reveal-card/reveal-card-showcase.component';
import { NbRevealCardColorsComponent } from './reveal-card/reveal-card-colors.component';
import { NbRevealCardAccentsComponent } from './reveal-card/reveal-card-accents.component';
import { NbRevealCardSizesComponent } from './reveal-card/reveal-card-sizes.component';
import { NbRevealCardFullComponent } from './reveal-card/reveal-card-full.component';
import { NbMenuShowcaseComponent } from './menu/menu-showcase.component';
import { NbMenuChildrenComponent } from './menu/menu-children.component';
import { NbActionShowcaseComponent } from './action/action-showcase.component';
import { NbActionSizesComponent } from './action/action-sizes.component';
import { NbActionBadgeComponent } from './action/action-badge.component';
import { NbActionWidthComponent } from './action/action-width.component';
import { NbSearchShowcaseComponent } from './search/search-showcase.component';
import { NbSearchEventComponent } from './search/search-event.component';
import { NbTabsetShowcaseComponent } from './tabset/tabset-showcase.component';
import { NbTabsetBadgeComponent } from './tabset/tabset-badge.component';
import { NbTabsetWidthComponent } from './tabset/tabset-width.component';
import { NbUserShowcaseComponent } from './user/user-showcase.component';
import { NbUserSizesComponent } from './user/user-sizes.component';
import { NbBadgeShowcaseComponent } from './badge/badge-showcase.component';
import { NbContextMenuShowcaseComponent } from './context-menu/context-menu-showcase.component';
import { NbContextMenuClickComponent } from './context-menu/context-menu-click.component';
import { NbAccordionShowcaseComponent } from './accordion/accordion-showcase.component';

export const routes: Routes = [
  {
    path: '',
    component: NbPlaygroundLayoutComponent,
    children: [
      {
        path: 'popover',
        children: [
          {
            path: 'popover-showcase.component',
            component: NbPopoverShowcaseComponent,
          },
          {
            path: 'popover-template-ref.component',
            component: NbPopoverTemplateRefComponent,
          },
          {
            path: 'popover-custom-component.component',
            component: NbPopoverCustomComponentComponent,
          },
          {
            path: 'popover-placements.component',
            component: NbPopoverPlacementsComponent,
          },
          {
            path: 'popover-modes.component',
            component: NbPopoverModesComponent,
          },
        ],
      },
      {
        path: 'checkbox',
        children: [
          {
            path: 'checkbox-showcase.component',
            component: NbCheckboxShowcaseComponent,
          },
          {
            path: 'checkbox-status.component',
            component: NbCheckboxStatusComponent,
          },
          {
            path: 'checkbox-disabled.component',
            component: NbCheckboxDisabledComponent,
          },
        ],
      },
      {
        path: 'card',
        children: [
          {
            path: 'card-showcase.component',
            component: NbCardShowcaseComponent,
          },
          {
            path: 'card-full.component',
            component: NbCardFullComponent,
          },
          {
            path: 'card-colors.component',
            component: NbCardColorsComponent,
          },
          {
            path: 'card-accents.component',
            component: NbCardAccentsComponent,
          },
          {
            path: 'card-sizes.component',
            component: NbCardSizesComponent,
          },
        ],
      },
      {
        path: 'flip-card',
        children: [
          {
            path: 'flip-card-showcase.component',
            component: NbFlipCardShowcaseComponent,
          },
          {
            path: 'flip-card-full.component',
            component: NbFlipCardFullComponent,
          },
          {
            path: 'flip-card-colors.component',
            component: NbFlipCardColorsComponent,
          },
          {
            path: 'flip-card-accents.component',
            component: NbFlipCardAccentsComponent,
          },
          {
            path: 'flip-card-sizes.component',
            component: NbFlipCardSizesComponent,
          },
        ],
      },
      {
        path: 'reveal-card',
        children: [
          {
            path: 'reveal-card-full.component',
            component: NbRevealCardFullComponent,
          },
          {
            path: 'reveal-card-showcase.component',
            component: NbRevealCardShowcaseComponent,
          },
          {
            path: 'reveal-card-colors.component',
            component: NbRevealCardColorsComponent,
          },
          {
            path: 'reveal-card-accents.component',
            component: NbRevealCardAccentsComponent,
          },
          {
            path: 'reveal-card-sizes.component',
            component: NbRevealCardSizesComponent,
          },
          {
            path: 'reveal-card-full.component',
            component: NbRevealCardFullComponent,
          },
        ],
      },
      {
        path: 'menu',
        children: [
          {
            path: 'menu-showcase.component',
            component: NbMenuShowcaseComponent,
          },
          {
            path: 'menu-children.component',
            component: NbMenuChildrenComponent,
          },
        ],
      },
      {
        path: 'action',
        children: [
          {
            path: 'action-showcase.component',
            component: NbActionShowcaseComponent,
          },
          {
            path: 'action-sizes.component',
            component: NbActionSizesComponent,
          },
          {
            path: 'action-badge.component',
            component: NbActionBadgeComponent,
          },
          {
            path: 'action-width.component',
            component: NbActionWidthComponent,
          },
        ],
      },
      {
        path: 'tabset',
        children: [
          {
            path: 'tabset-showcase.component',
            component: NbTabsetShowcaseComponent,
          },
          {
            path: 'tabset-badge.component',
            component: NbTabsetBadgeComponent,
          },
          {
            path: 'tabset-width.component',
            component: NbTabsetWidthComponent,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'user-showcase.component',
            component: NbUserShowcaseComponent,
          },
          {
            path: 'user-sizes.component',
            component: NbUserSizesComponent,
          },
        ],
      },
      {
        path: 'badge',
        children: [
          {
            path: 'badge-showcase.component',
            component: NbBadgeShowcaseComponent,
          },
        ],
      },
      {
        path: 'accordion',
        children: [
          {
            path: '',
            component: NbAccordionShowcaseComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: NbPlaygroundBaseComponent,
    children: [
      {
        path: 'context-menu',
        children: [
          {
            path: 'context-menu-showcase.component',
            component: NbContextMenuShowcaseComponent,
          },
          {
            path: 'context-menu-click.component',
            component: NbContextMenuClickComponent,
          },
        ],
      },
      {
        path: 'layout',
        children: [
          {
            path: 'layout-showcase.component',
            component: NbLayoutShowcaseComponent,
          },
          {
            path: 'layout-w-footer.component',
            component: NbLayoutWFooterComponent,
          },
          {
            path: 'layout-fixed-header.component',
            component: NbLayoutFixedHeaderComponent,
          },
          {
            path: 'layout-column-left.component',
            component: NbLayoutColumnLeftComponent,
          },
        ],
      },
      {
        path: 'sidebar',
        children: [
          {
            path: 'sidebar-showcase.component',
            component: NbSidebarShowcaseComponent,
          },
          {
            path: 'sidebar-compacted.component',
            component: NbSidebarCompactedComponent,
          },
          {
            path: 'sidebar-right.component',
            component: NbSidebarRightComponent,
          },
          {
            path: 'sidebar-toggle.component',
            component: NbSidebarToggleComponent,
          },
          {
            path: 'sidebar-fixed.component',
            component: NbSidebarFixedComponent,
          },
        ],
      },
      {
        path: 'search',
        children: [
          {
            path: 'search-showcase.component',
            component: NbSearchShowcaseComponent,
          },
          {
            path: 'search-event.component',
            component: NbSearchEventComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPlaygroundRoutingModule {}
