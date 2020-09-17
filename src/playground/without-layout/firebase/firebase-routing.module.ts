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
import { PasswordAuthShowcaseComponent } from './password-auth-showcase/password-auth-showcase.component';
import {
  IdentityProvidersAuthShowcaseComponent,
} from './identity-proders-auth-showcase/identity-providers-auth-showcase.component';


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
    path: 'password-showcase',
    component: PasswordAuthShowcaseComponent,
  },
  {
    path: 'social-auth-showcase',
    component: IdentityProvidersAuthShowcaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirebasePlaygroundRoutingModule {
}
