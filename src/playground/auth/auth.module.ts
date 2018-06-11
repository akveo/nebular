/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';

import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NbDummyAuthStrategy, NbAuthJWTInterceptor,
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { NbAuthPlaygroundComponent } from './auth.component';
import { NbAuthPlaygroundRoutingModule } from './auth-routing.module';
import { NbCustomRoleProvider } from './role.provider';
import { NbAclTestComponent } from './acl/acl-test.component';
import { NbAuthGuard } from './auth-guard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NbAuthPlaygroundRoutingModule,

    NbCardModule,
    NbLayoutModule,

    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 3000,
          socialLinks: [
            {
              url: 'https://github.com/akveo',
              target: '_blank',
              title: 'GitHub',
            },
            {
              url: 'https://www.facebook.com/akveo',
              target: '_blank',
              icon: 'nb-home',
            },
            {
              url: 'https://www.facebook.com/akveo',
              target: '_blank',
              title: 'Twitter',
            },
          ],
        },
      },
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'dummy',

          alwaysFail: true,
          delay: 1000,
        }),

        NbPasswordAuthStrategy.setup({
          name: 'email',

          token: {
            class: NbAuthJWTToken,
          },
          baseEndpoint: 'http://localhost:4400/api/auth/',
          logout: {
            redirect: {
              success: '/auth/login',
              failure: '/auth/login',
            },
          },
          requestPass: {
            redirect: {
              success: '/auth/reset-password',
            },
          },
          resetPass: {
            redirect: {
              success: '/auth/login',
            },
          },
          errors: {
            key: 'data.errors',
          },
        }),
      ],
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['news', 'comments'],
        },
        user: {
          parent: 'guest',
          create: 'comments',
        },
        moderator: {
          parent: 'user',
          create: 'news',
          remove: '*',
        },
      },
    }),
  ],
  declarations: [
    NbAuthPlaygroundComponent,
    NbAclTestComponent,
  ],
  providers: [
    NbAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NbRoleProvider, useClass: NbCustomRoleProvider },
  ],
})
export class NbAuthPlaygroundModule {
}
