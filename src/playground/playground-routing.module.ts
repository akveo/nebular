/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbPlaygroundComponent } from './playground.component';

import { NbPopoverShowcaseComponent } from './popover/popover-showcase.component';
import { NbPopoverTemplateRefComponent } from './popover/popover-template-ref.component';
import { NbPopoverCustomComponentComponent } from './popover/popover-custom-component.component';
import { NbPopoverPlacementsComponent } from './popover/popover-placements.component';
import { NbPopoverModesComponent } from './popover/popover-modes.component';
import { NbCheckboxShowcaseComponent } from './checkbox/checkbox-showcase.component';
import { NbCheckboxStatusComponent } from './checkbox/checkbox-status.component';
import { NbCheckboxDisabledComponent } from './checkbox/checkbox-disabled.component';


export const routes: Routes = [
  {
    path: '',
    component: NbPlaygroundComponent,
    children: [
      {
        path: 'popover-showcase/popover-showcase.component',
        component: NbPopoverShowcaseComponent,
      },
      {
        path: 'popover-template-ref/popover-template-ref.component',
        component: NbPopoverTemplateRefComponent,
      },
      {
        path: 'popover-custom-component/popover-custom-component.component',
        component: NbPopoverCustomComponentComponent,
      },
      {
        path: 'popover-placements/popover-placements.component',
        component: NbPopoverPlacementsComponent,
      },
      {
        path: 'popover-modes/popover-modes.component',
        component: NbPopoverModesComponent,
      },
      {
        path: 'checkbox-showcase/checkbox-showcase.component',
        component: NbCheckboxShowcaseComponent,
      },
      {
        path: 'checkbox-status/checkbox-status.component',
        component: NbCheckboxStatusComponent,
      },
      {
        path: 'checkbox-disabled/checkbox-disabled.component',
        component: NbCheckboxDisabledComponent,
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
