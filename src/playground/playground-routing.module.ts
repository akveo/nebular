/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './with-layout/with-layout.module#WithLayoutModule',
  },
  {
    path: '',
    loadChildren: './without-layout/without-layout.module#WithoutLayoutModule',
  },
  {
    path: '',
    loadChildren: './without-styles/without-styles.module#WithoutStylesModule',
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PlaygroundRoutingModule {}
