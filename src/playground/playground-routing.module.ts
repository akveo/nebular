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
    loadChildren: () => import('./with-layout/with-layout.module').then(m => m.WithLayoutModule),
  },
  {
    path: '',
    loadChildren: () => import('./without-layout/without-layout.module').then(m => m.WithoutLayoutModule),
  },
  {
    path: '',
    loadChildren: () => import('./without-styles/without-styles.module').then(m => m.WithoutStylesModule),
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PlaygroundRoutingModule {}
