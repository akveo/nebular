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

export const routes: Routes = [
  {
    path: '',
    component: NbPlaygroundLayoutComponent,
    children: [
      {
        path: 'popover/popover-showcase.component',
        component: NbPopoverShowcaseComponent,
      },
      {
        path: 'popover/popover-template-ref.component',
        component: NbPopoverTemplateRefComponent,
      },
      {
        path: 'popover/popover-custom-component.component',
        component: NbPopoverCustomComponentComponent,
      },
      {
        path: 'popover/popover-placements.component',
        component: NbPopoverPlacementsComponent,
      },
      {
        path: 'popover/popover-modes.component',
        component: NbPopoverModesComponent,
      },
      {
        path: 'checkbox/checkbox-showcase.component',
        component: NbCheckboxShowcaseComponent,
      },
      {
        path: 'checkbox/checkbox-status.component',
        component: NbCheckboxStatusComponent,
      },
      {
        path: 'checkbox/checkbox-disabled.component',
        component: NbCheckboxDisabledComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'layout',
        component: NbPlaygroundBaseComponent,
        children: [
          {
            path: 'layout-showcase',
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
        component: NbPlaygroundBaseComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPlaygroundRoutingModule {
}
