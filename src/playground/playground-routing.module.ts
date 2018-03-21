/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopoverExampleComponent } from './examples';
import { PlaygroundComponent } from './playground.component';


export const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent,
    children: [
      { path: 'popover', component: PopoverExampleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaygroundRoutingModule {
}
