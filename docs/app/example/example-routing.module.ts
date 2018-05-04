/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgdExampleComponent } from './example.component';


export const routes: Routes = [
  {
    path: '',
    component: NgdExampleComponent,
    children: [
      {
        path: '',
        loadChildren: '../../../src/playground/playground.module#NbPlaygroundModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgdExampleRoutingModule {
}
