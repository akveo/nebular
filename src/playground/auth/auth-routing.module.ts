/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthPlaygroundComponent } from './auth.component';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { NbAclTestComponent } from './acl/acl-test.component';
import { NbAuthGuard } from './auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    component: NbAuthPlaygroundComponent,
    children: [
      {
        path: 'auth',
        component: NbAuthComponent,
        children: [
          {
            path: '',
            component: NbLoginComponent,
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
    path: 'auth/acl/acl-test.component',
    component: NbAclTestComponent,
  },
  {
    path: 'auth/auth-guard.service',
    canActivate: [NbAuthGuard],
    component: NbAuthPlaygroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbAuthPlaygroundRoutingModule {
}
