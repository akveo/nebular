/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxAppComponent } from './components/app.component';

export const routes: Routes = [
  {
    path: '',
    component: NgxAppComponent,
  },
  {
    path: 'auth',
    loadChildren: './auth/smart-home-auth.module#NgxAuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAppRouting {
}
