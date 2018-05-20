/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbPlaygroundComponent } from './playground.component';

import { NbPopoverShowcaseComponent } from './popover-showcase/popover-showcase.component';
import { NbPopoverTemplateRefComponent } from './popover-template-ref/popover-template-ref.component';
import { NbPopoverCustomComponentComponent } from './popover-custom-component/popover-custom-component.component';
import { NbPopoverPlacementsComponent } from './popover-placements/popover-placements.component';
import { NbPopoverModesComponent } from './popover-modes/popover-modes.component';


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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPlaygroundRoutingModule {
}
