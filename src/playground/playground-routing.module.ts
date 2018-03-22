/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbPopoverExampleComponent } from './examples';
import { NbPlaygroundComponent } from './playground.component';


export const routes: Routes = [
  {
    path: '',
    component: NbPlaygroundComponent,
    children: [
      { path: 'popover', component: NbPopoverExampleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbPlaygroundRoutingModule {
}
