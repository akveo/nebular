/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { FirebasePlaygroundComponent } from './firebase-playground.component';
import { FirebaseAuthShowcaseComponent } from './showcase/firebase-showcase.component';


export const routes: Routes = [
  {
    path: '',
    component: FirebasePlaygroundComponent,
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
    path: 'result',
    component: FirebaseAuthShowcaseComponent,
  },
  // {
  //   path: 'acl/acl-test.component',
  //   component: AclTestComponent,
  // },
  // {
  //   path: 'auth-guard.service',
  //   canActivate: [AuthGuard],
  //   component: AuthPlaygroundComponent,
  // },
  // {
  //   path: 'api-calls.component',
  //   canActivate: [AuthGuard],
  //   component: PlaygroundApiCallsComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebasePlaygroundRoutingModule {
}
