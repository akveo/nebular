/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPlaygroundComponent } from './auth.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AclTestComponent } from './acl/acl-test.component';
import { AuthGuard } from './auth-guard.service';
import { PlaygroundApiCallsComponent } from './api-calls/api-calls.component';


export const routes: Routes = [
  {
    path: '',
    component: AuthPlaygroundComponent,
    children: [
      {
        path: '',
        component: NbAuthComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            component: NbLoginComponent,
          },
          {
            path: 'register',
            component: NbRegisterComponent,
          },
          {
            path: 'logout',
            component: NbLogoutComponent,
          },
          {
            path: 'request-password',
            component: NbRequestPasswordComponent,
          },
          {
            path: 'reset-password',
            component: NbResetPasswordComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'acl/acl-test.component',
    component: AclTestComponent,
  },
  {
    path: 'auth-guard.service',
    canActivate: [AuthGuard],
    component: AuthPlaygroundComponent,
  },
  {
    path: 'api-calls.component',
    canActivate: [AuthGuard],
    component: PlaygroundApiCallsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPlaygroundRoutingModule {
}
